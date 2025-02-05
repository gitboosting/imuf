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
  # orientations <- purrr::accumulate(lst_ned_in, myCompUpdate, .init = c(1, 0, 0, 0))

  ui = fluidPage(
    actionButton("do", "Click Me"),
    imu_objectOutput('orientations'),
    verbatimTextOutput("elid")
  )

  server = function(input, output, session) {
    observeEvent(input$do, {
      quat <- c(1, 0, 0, 0)
      for (i in 1:1000) {    # loop will exit in 1000 * dt = 20 sec
        quat <- myCompUpdate(quat, lst_ned_in[[i]])
        imu_proxy(input$elid) %>%
          imu_send_data(data = quat)
        Sys.sleep(dt)
      }
    })

    output$orientations <- renderImu_object(
      imu_object("felix")
    )

    output$elid <- renderPrint({
      print(input$elid)
    })

  }
  shinyApp(ui = ui, server = server)
}
