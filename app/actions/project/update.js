module.exports = async function($) {
  await $.validate({
    query: {
      id: {
        is: '$id',
        required: true
      }
    },
    values: {
      title: {
        min: 2
      }
    }
  })
  const { query = {}, values = {} } = $.params
  return await $.db('project').update(query, values)
}