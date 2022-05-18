module.exports = async function($) {
  let {
    search = '',
    query = {},
    fields = {},
    sort = { name: 1 },
    skip,
    limit,
    include = []
  } = $.params

  const regexp = new RegExp(search, 'i')
  return await $.db('project').find(
    {
      ...query,
      $or: [
        { title: regexp }
      ]
    },
    { sort, skip, limit }
  )
}
