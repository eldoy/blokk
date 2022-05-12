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
      data: {
        action: '/project/find',
        limit: 10,
        sort: {
          created_at: -1
        }
      },
      search: {
        action: '/project/search',
        limit: 10,
        sort: {
          created_at: -1
        }
      },
      row: function(item) {
        return item.title
      },
      edit: function(item) {
        return 'edit'
      },
      delete: function(item) {
        return 'delete'
      }
    })}
  `
}
