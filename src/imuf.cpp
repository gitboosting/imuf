#include <RcppEigen.h>
#include <Rcpp.h>

// [[Rcpp::depends(RcppEigen)]]

using namespace Rcpp;
using Eigen::Quaternion;
using Eigen::QuaternionBase;
using Eigen::VectorXd;

VectorXd numericVecToVec(NumericVector v) {
  VectorXd vout(3); vout << v[0], v[1], v[2];
  return vout;
}

NumericVector vecToNumericVec(VectorXd v) {
  NumericVector vout = { v[0], v[1], v[2] };
  return vout;
}

// Eigen::Vector3d vxdTov3d(VectorXd v) {
//   Eigen::Vector3d vout(v[0], v[1], v[2]);
//   return vout;
// }

// [[Rcpp::export]]
NumericVector nv2vec2nv(NumericVector vin) {
  VectorXd v = numericVecToVec(vin);
  NumericVector nv = vecToNumericVec(v);
  return nv;
}

Quaternion<double> vecToQuat(VectorXd v) {
  return Quaternion<double> { 0, v[0], v[1], v[2] };
}

Quaternion<double> numericVecToQuat(NumericVector v) {
  Quaternion<double> q(v[0], v[1], v[2], v[3]);
  return q;
}

NumericVector quatToNumericVec(Quaternion<double> q) {
  return NumericVector { q.w(), q.x(), q.y(), q.z() };
}

Quaternion<double> qTimesD(Quaternion<double> q, double d) {
  // a function to multiply a quaternion by a double
  Quaternion<double> qout(q.coeffs() * d);
  return qout;
}

Quaternion<double> operator* (const Quaternion<double>& q, double d) { return qTimesD(q, d); }
Quaternion<double> operator* (double d, const Quaternion<double>& q) { return qTimesD(q, d); }
Quaternion<double> operator/ (const Quaternion<double>& q, double d) { return qTimesD(q, 1/d); }

Quaternion<double> operator+ (const Quaternion<double>& q1, const Quaternion<double>& q2) {
  Quaternion<double> qout;
  qout.w() = q1.w() + q2.w();
  qout.x() = q1.x() + q2.x();
  qout.y() = q1.y() + q2.y();
  qout.z() = q1.z() + q2.z();
  return qout;
}

// [[Rcpp::export]]
NumericVector nv2quat2nv(NumericVector nvin) {
  Quaternion<double> q = numericVecToQuat(nvin);
  NumericVector nv = quatToNumericVec(q);
  return nv;
}

// [[Rcpp::export]]
NumericVector compUpdate(NumericVector acc, NumericVector gyr, double dt, NumericVector initQuat, double gain) {

  const VectorXd accVec = numericVecToVec(acc);
  const VectorXd gyrVec = numericVecToVec(gyr);
  const Quaternion<double> qt = numericVecToQuat(initQuat);
  //
  // make gryVec into a quat for Euler Equation
  const Quaternion<double> gyrQuat = vecToQuat(gyrVec);
  const double gyrQuatNorm = gyrQuat.norm();
  const double delta = gyrQuatNorm * dt / 2.0;
  Quaternion<double> qt1 = qt * cos(delta) + qt * (gyrQuat * 1 / gyrQuatNorm * sin(delta));
  qt1.normalize();
  //
  // transform acc from body-fixed frame to world frame
  const VectorXd accWorld = qt1 * accVec;
  //
  // complement with accelerometer info
  VectorXd g(3); g << 0, 0, -1;
  Quaternion<double> qAdj = Quaternion<double>::FromTwoVectors(accWorld, g);
  //
  // adjust rotation quaternion by nudging it towards g by gain * phi
  Quaternion<double> qout = qt1.slerp(gain, qAdj * qt1);
  //
  return quatToNumericVec(qout);
}

/*** R
# use realistic imu readings

(vout <- nv2vec2nv(c(7, 8, 9)))
#
(nvout <- nv2quat2nv(c(5, 6, 7, 8)))
#
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
eigenExpt.cpp
Displaying eigenExpt.cpp.
