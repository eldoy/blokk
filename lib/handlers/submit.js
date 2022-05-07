module.exports = async function submit(event) {
  var btn = event.currentTarget
  console.log('Submitting')
  btn.disabled = true

  var form = btn.form
  var action = form.getAttribute('data-action')
  var message = form.getAttribute('data-message')
  var redirect = form.getAttribute('data-redirect')
  var query = form.getAttribute('data-query')
  console.log({ action, message, redirect, query })

  var values = serialize(form)
  var data = { values }
  if (query) {
    data.query = JSON.parse(query)
  }

  var result = await api(action, data)
  console.log(result)
  if (!showErrors(result)) {
    if (message) {
      if (typeof redirect == 'string') {
        window.cookie('flash', message)
      } else {
        window.flash(message)
      }
    }
    if (typeof redirect == 'string') {
      window.location = redirect
    }
  }
  btn.disabled = false
}