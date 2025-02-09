#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
imu_object <- function(data = c(1, 0, 0, 0), width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    data = data
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'imu_object',
    x,
    width = width,
    height = height,
    package = 'imuf',
    elementId = elementId
  )
}

imu_object_html <- function(id, style, class, ...){
  htmltools::tags$canvas(id = id, class = class)
}

#' Shiny bindings for imu_object
#'
#' Output and render functions for using imu_object within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a imu_object
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name imu_object-shiny
#'
#' @export
imu_objectOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'imu_object', width, height, package = 'imuf')
}

#' @rdname imu_object-shiny
#' @export
renderImu_object <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, imu_objectOutput, env, quoted = TRUE)
}

#' @export
imu_proxy <- function(id, session = shiny::getDefaultReactiveDomain()) {
  list(id = id, session = session)
}

#' @export
imu_send_data <- function(proxy, data) {
  message <- list(id = proxy$id, data = data)
  proxy$session$sendCustomMessage("send-data", message)
}
