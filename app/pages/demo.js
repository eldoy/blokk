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
      fetch: {
        action: '/project/find',
        sort: {
          created_at: -1
        }
      },
      search: {
        action: '/project/search',
        sort: {
          created_at: -1
        }
      }
    })}
  `
}
