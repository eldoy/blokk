module.exports = async function($) {
  await $.validate({
    values: {
      title: {
        required: true,
        min: 2
      }
    }
  })
  const { values = {} } = $.params
  return await $.db('project').create(values)
}