module.exports = function(opt) {
  const { action, message, redirect, update } = opt
  let h = `<form onsubmit="return false"`
  if (action) {
    h += ` data-action="${action}"`
  }
  if (message) {
    h += ` data-message="${message}"`
  }
  if (typeof redirect == 'string') {
    h += ` data-redirect="${redirect}"`
  }
  if (update) {
    h += ` data-query="${JSON.stringify(update)}"`
  }
  return h + `>`
}
