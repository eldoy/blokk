const form = require(process.cwd() + '/lib/form.js')

module.exports = async function($) {
  const project = await $.db('project').get({ id: $.query.project_id })

  return /* html */`
    <h1>Delete</h1>
    <p>Really delete ${project.id}?</p>
    ${await form({
      action: '/project/delete',
      query: {
        id: project.id
      },
      message: 'Project deleted',
      redirect: '/demo',
      button: 'Delete'
    })}
  `
}
