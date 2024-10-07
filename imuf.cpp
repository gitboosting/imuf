// [[Rcpp::depends(BH)]]
#include <Rcpp.h>
#include <boost/math/constants/constants.hpp>
#include <boost/qvm/all.hpp>
using namespace Rcpp;
using namespace boost::math::constants;
using namespace boost::qvm;

vec<double, 3> numericVecToVec(NumericVector v) {
  return vec<double, 3> { v[0], v[1], v[2] };
}

quat<double> vecToQuat(vec<double, 3> v) {
  return quat<double> { 0, X(v), Y(v), Z(v) };
}

NumericVector quatToNumericVec(quat<double> q) {
  return NumericVector { S(q), X(q), Y(q), Z(q) };
}

quat<double> numericVecToQuat(NumericVector v) {
  return quat<double> { v[0], v[1], v[2], v[3] };
}

// [[Rcpp::export(name = "compUpdate")]]
NumericVector compUpdate(NumericVector acc, NumericVector gyr, double dt, NumericVector initQuat, double gain) {
  const vec<double, 3> accVec = numericVecToVec(acc);
  const vec<double, 3> gyrVec = numericVecToVec(gyr);
  const quat<double> qt = numericVecToQuat(initQuat);
  //
  // make gryVec into a quat for Euler Equation
  const quat<double> gyrQuat = vecToQuat(gyrVec);
  const double gyrQuatNorm = mag(gyrQuat);
  const double delta = gyrQuatNorm * dt / 2.0;
  quat<double> qt1 = qt * cos(delta) + qt * 1 / gyrQuatNorm * sin(delta) * gyrQuat;
  normalize(qt1);
  //
  // rotate acc by qt1
  const vec<double, 3> accWorld = qt1 * accVec;
  //
  // complement with accelerometer info
  const vec<double, 3> g = { 0, 0, -1 };
  const vec<double, 3> n = cross(accWorld, g);
  const double magN = mag(n);
  const double qaDotG = dot(accWorld, g);
  const double phi = std::atan2(magN, qaDotG);
  //
  // adjust rotation quaternion by nudging it towards g by gain * phi
  quat<double> qAdj = rot_quat(n, gain * phi);
  normalize(qAdj);
  quat<double> qout = qAdj * qt1;
  normalize(qout);
  
  return quatToNumericVec(qout);
}

/*** R
# use realistic imu readings
#
initQ <- c(0.9838937550736144, -0.008503796943710444, -0.0026035201363168387, -0.17853287049611438)
acc <- c(-0.005615234, 0.019042969, -1.004150391)
gyr <- c(0, -0.009587379919921934, -0.00745685105658519)
dt <- 0.024
gain <- 0.1
qout <- compUpdate(acc, gyr, dt, initQ, gain)
#
qout  # should be 0.9838771143246333 -0.008654456431112963 -0.0025514591206403673 -0.17861806837067223
#
*/