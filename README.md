
<!-- README.md is generated from README.Rmd. Please edit that file -->

# imuf

<!-- badges: start -->

[![R-CMD-check](https://github.com/gitboosting/imuf/actions/workflows/R-CMD-check.yaml/badge.svg)](https://github.com/gitboosting/imuf/actions/workflows/R-CMD-check.yaml)
<!-- badges: end -->

‘imuf’ uses complementary filtering to estimate the orientation of an
inertial measurement unit (IMU) with a 3-axis accelerometer and a 3-axis
gyroscope. It takes the IMU’s accelerometer and gyroscope readings, time
duration, its initial orientation, and a ‘gain’ factor as inputs, and
provides an estimate of the final orientation as outputs.

## Installation

You can install the development version of imuf from
[GitHub](https://github.com/) with:

``` r
# install.packages("pak")
pak::pak("gitboosting/imuf")
```

## Example

This is a basic example which shows you how to solve a common problem:

``` r
library(imuf)
final <- compUpdate(c(0, 0, -1), c(1, 0, 0), 0.1, c(1, 0, 0, 0), 0.1)
```
