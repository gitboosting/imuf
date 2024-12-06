## code to prepare `walking_shin_1` dataset
#
library(tidyverse)
#
# source downloaded from:
# https://www.uni-mannheim.de/dws/research/projects/activity-recognition/dataset/dataset-realworld/s1/
gyr <- readr::read_csv("data-raw/Gyroscope_walking_shin.csv")
acc <- readr::read_csv("data-raw/acc_walking_shin.csv")
#
acc <-
  acc %>%
  dplyr::select(id, attr_x, attr_y, attr_z) %>%
  dplyr::rename(acc_x = attr_x, acc_y = attr_y, acc_z = attr_z)
gyr <-
  gyr %>%
  dplyr::select(id, attr_x, attr_y, attr_z) %>%
  dplyr::rename(gyr_x = attr_x, gyr_y = attr_y, gyr_z = attr_z)
#
accGyrDf <- acc %>% dplyr::inner_join(gyr) %>% dplyr::select(-1)
#
# function to change the IMU coordinate system to NED
# as imuf uses NED
toNED <- function(accgyrDf) {
  df <- accgyrDf
  #
  df$acc_x <- accgyrDf$acc_z
  df$acc_y <- -1 * accgyrDf$acc_x
  df$acc_z <- -1 * accgyrDf$acc_y
  #
  df$gyr_x <- accgyrDf$gyr_z
  df$gyr_y <- -1 * accgyrDf$gyr_x
  df$gyr_z <- -1 * accgyrDf$gyr_y
  #
  df
}
#
walking_shin_1 <- toNED(accGyrDf)
#
#
usethis::use_data(walking_shin_1, overwrite = TRUE)
