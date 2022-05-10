module.exports = async function(event) {
  console.log('SEARCH')
  var input = event.currentTarget
  var s = input.value
  var action = input.getAttribute('data-search')
  const result = await api(action, { s })
  console.log(s)
}