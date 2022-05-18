const list = require(process.cwd() + '/lib/list.js')

module.exports = async function($) {
  $.page.title = 'Demo'

  const projects = await $.db('project').find({}, {
    limit: 10,
    sort: { created_at: -1 }
  })

  return /* html */`
    <h1>Demo</h1>
    <div id="project-list">
      ${list({
        el: '#project-list',
        title: 'Projects',
        size: 2,
        items: projects,
        limit: 10,
        handleFetch: function({ sort, skip, limit }) {
          return api('/project/find', {
            query: {},
            skip,
            limit,
            sort
          })
        },
        handleSearch: function({ search, sort, skip, limit }) {
          return api('/project/search', {
            query: {},
            search,
            sort,
            skip,
            limit
          })
        },
        renderInfo: function(item) {
          return `<a href="/project/show?project_id=${item.id}">${item.title} (${item.id})</a>`
        }
      })}
    </div>
  `
}
