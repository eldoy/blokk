module.exports = async function submit(event) {
  var btn = event.currentTarget
  console.log('Submitting')
  btn.disabled = true
  var form = btn.form
  var options = form.getAttribute('data-options')
  console.log(options)
  var { action, message, redirect, query } = JSON.parse(options)
  console.log({ action, message, redirect, query })

  var values = serialize(form)
  var data = { values }
  if (query) {
    data.query = query
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