const list = require(process.cwd() + '/lib/list.js')

module.exports = async function($) {
  $.page.title = 'Demo'

  const projects = await $.db('project').find({}, { sort: { created_at: -1 } })

  return /* html */`
    <h1>Demo</h1>
    ${await list({
      title: 'Your projects',
      desc: 'This is what you have to do',
      create: `<a href="/project/new">+ Create new project</a>`,
      render: projects,
      item: async function(project) {
        return project.title
      },
      show: async function(project) {
        return `<a href="/project/show?project_id=${project.id}">Show</a>`
      },
      edit: async function(project) {
        return `<a href="/project/edit?project_id=${project.id}">Edit</a>`
      },
      del: async function(project) {
        return `<a href="/project/delete?project_id=${project.id}">Delete</a>`
      }
    })}
  `
}
