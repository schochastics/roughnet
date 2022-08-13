#' Save roughnet plot to file
#' @param rnet result from calling the function `roughnet`
#' @param file filename
#' @param background string giving the html background color
#' @return No return value, called for side effect
#' @export
save_roughnet <- function(rnet, file, background = "white") {
  if (!requireNamespace("pagedown", quietly = TRUE)) {
    stop("pagedown is needed for this function to work. Please install it.", call. = FALSE)
  }
  tfile <- tempfile(fileext = ".html")
  format <- substr(file, nchar(file) - 2, nchar(file))
  htmlwidgets::saveWidget(rnet, file = tfile, background = background, selfcontained = TRUE)
  suppressMessages(pagedown::chrome_print(tfile, output = file, format = format, selector = "canvas#canvas", wait = 4))
  suppressMessages(unlink(tfile))
}
