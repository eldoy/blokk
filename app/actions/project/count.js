module.exports = async function($) {
  const { query = {} } = $.params
  const count = await $.db('project').count(query)
  return { n: count }
}