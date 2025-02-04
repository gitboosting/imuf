library(shiny)

runshiny <- function(...) {
  #
  lst_ned_in <- as.list(as.data.frame(t(walking_shin_1))) %>% unname
  dt <- 1/50
  #
  myCompUpdate <- function(initQ, accgyr) {
    acc <- accgyr[1:3]
    gyr <- accgyr[4:6]
    gain <- 0.1
    orientation <- compUpdate(acc, gyr, dt, initQ, gain)
    orientation
  }
  #
  orientations <- purrr::accumulate(lst_ned_in, myCompUpdate, .init = c(1, 0, 0, 0))

  ui = fluidPage(
    imu_objectOutput('orientations'),
    verbatimTextOutput("elid")
  )

  server = function(input, output, session) {
    updateMesh <- function(id, quat) {
      message <- list(id = id, quat = quat)
    }

    output$orientations <- renderImu_object(
      imu_object("felix")
    )

    output$elid <- renderPrint({
      print(input$elid)
    })
  }
  shinyApp(ui = ui, server = server)
}
