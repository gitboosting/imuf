library(shiny)

getCon <- function(port) {
  #
  # set up connection for serial port
  con <- serial::serialConnection(name = "testcon", port = port,
                                  mode = "115200,n,8,1", newline = 1, translation = "crlf"
  )
  if (serial::isOpen(con)) {
    close(con)
  }
  con
}

readFromSerial <- function(con) {
  if (!requireNamespace("serial", quietly = TRUE)) {
    stop(
      "Package \"serial\" must be installed to use this function.",
      call. = FALSE
    )
  }
  minLength <- 32
  nInQ <- serial::nBytesInQueue(con)["n_in"]
  if(nInQ <= minLength) return(NULL)
  a <- serial::read.serialConnection(con)
  a <- stringr::str_split_1(a, ",") %>% trimws() %>% as.numeric() %>% suppressWarnings()
  if (length(a) != 6) return(NULL)
  a
}

bmi2ned <- function(bmi) {
  # convert bmi coord to ned coord
  c(bmi[1], -bmi[2], -bmi[3])
}

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
      con <- getCon("COM3")
      open(con)
      quat <- c(1, 0, 0, 0)
      while (TRUE) {
        a <- readFromSerial(con)
        if (is.null(a)) next
        accgyr <- c(bmi2ned(a[1:3]), bmi2ned(a[4:6]))
        quat <- myCompUpdate(quat, accgyr)
        print(quat)
        imu_proxy(input$elid) %>%
          imu_send_data(data = quat)
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
