const image = {}
image.isImage = function(name) {
  return /\.(gif|jpe?g|tiff|png|bmp|svg)$/i.test(name)
}

module.exports = image