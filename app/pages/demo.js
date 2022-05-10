const list = require(process.cwd() + '/lib/list.js')

module.exports = async function($) {
  $.page.title = 'Demo'

  const projects = await $.db('project').find({}, {
    limit: 10,
    sort: { created_at: -1 }
  })

  return /* html */`
    <h1>Demo</h1>
    ${list({
      title: 'Projects',
      items: projects,
      render: function() {
        return api('/project/find', {
          limit: 10,
          sort: { created_at: -1 }
        })
      }
    })}
  `
}
