const urls = [
  'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
  'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg',
  'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg',
  'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg'
]

module.exports = async function($) {
  let length = $.files.length
  if (length > urls.length) {
    length = urls.length
  }
  return urls.slice(0, length)
}
