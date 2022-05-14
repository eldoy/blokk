const list = require(process.cwd() + '/lib/list.js')

module.exports = async function($) {
  $.page.title = 'Demo'

  const projects = await $.db('project').find({}, {
    limit: 10,
    sort: { created_at: -1 }
  })

  return /* html */`
    <h1>Demo</h1>
    ${await list({
      title: 'Projects',
      items: projects,
      fetch: function(state) {
        return api('/project/find', {
          limit: state.limit,
          skip: state.skip,
          sort: {
            created_at: -1
          }
        })
      },
      search: function(state) {
        console.log(state.limit)
        console.log(state.skip)
        console.log(state.s)
        return api('/project/search', {
          s: state.s,
          limit: state.limit,
          skip: state.skip,
          sort: {
            created_at: -1
          }
        })
      },
      detail: function(item) {
        return item.title
      },
      edit: function(item) {
        return 'edit'
      },
      del: function(item) {
        return 'delete'
      }
    })}
  `
}
