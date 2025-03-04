// Generated by using Rcpp::compileAttributes() -> do not edit by hand
// Generator token: 10BE3573-1514-4C36-9D1C-5A225CD40393

#include <RcppEigen.h>
#include <Rcpp.h>

using namespace Rcpp;

#ifdef RCPP_USE_GLOBAL_ROSTREAM
Rcpp::Rostream<true>&  Rcpp::Rcout = Rcpp::Rcpp_cout_get();
Rcpp::Rostream<false>& Rcpp::Rcerr = Rcpp::Rcpp_cerr_get();
#endif

// compUpdate
NumericVector compUpdate(NumericVector acc, NumericVector gyr, double dt, NumericVector initQuat, double gain);
RcppExport SEXP _imuf_compUpdate(SEXP accSEXP, SEXP gyrSEXP, SEXP dtSEXP, SEXP initQuatSEXP, SEXP gainSEXP) {
BEGIN_RCPP
    Rcpp::RObject rcpp_result_gen;
    Rcpp::RNGScope rcpp_rngScope_gen;
    Rcpp::traits::input_parameter< NumericVector >::type acc(accSEXP);
    Rcpp::traits::input_parameter< NumericVector >::type gyr(gyrSEXP);
    Rcpp::traits::input_parameter< double >::type dt(dtSEXP);
    Rcpp::traits::input_parameter< NumericVector >::type initQuat(initQuatSEXP);
    Rcpp::traits::input_parameter< double >::type gain(gainSEXP);
    rcpp_result_gen = Rcpp::wrap(compUpdate(acc, gyr, dt, initQuat, gain));
    return rcpp_result_gen;
END_RCPP
}
// rotV
NumericVector rotV(NumericVector quat, NumericVector vin);
RcppExport SEXP _imuf_rotV(SEXP quatSEXP, SEXP vinSEXP) {
BEGIN_RCPP
    Rcpp::RObject rcpp_result_gen;
    Rcpp::RNGScope rcpp_rngScope_gen;
    Rcpp::traits::input_parameter< NumericVector >::type quat(quatSEXP);
    Rcpp::traits::input_parameter< NumericVector >::type vin(vinSEXP);
    rcpp_result_gen = Rcpp::wrap(rotV(quat, vin));
    return rcpp_result_gen;
END_RCPP
}

static const R_CallMethodDef CallEntries[] = {
    {"_imuf_compUpdate", (DL_FUNC) &_imuf_compUpdate, 5},
    {"_imuf_rotV", (DL_FUNC) &_imuf_rotV, 2},
    {NULL, NULL, 0}
};

RcppExport void R_init_imuf(DllInfo *dll) {
    R_registerRoutines(dll, NULL, CallEntries, NULL, NULL);
    R_useDynamicSymbols(dll, FALSE);
}
