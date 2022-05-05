module.exports = async function($) {
  const {
    query = {},
    fields = {},
    sort = {},
    skip = 0,
    limit = 0
  } = $.params
  return await $.db('project').find(query, { fields, sort, skip, limit })
}