module.exports = async function($) {
  await $.validate({
    query: {
      id: {
        is: '$id',
        required: true
      }
    }
  })
  const { query = {} } = $.params
  return await $.db('project').delete(query)
}