const form = require(process.cwd() + '/lib/form.js')

module.exports = async function($) {
  const project = await $.db('project').get({ id: $.query.project_id })

  return /* html */`
    <a href="/demo">&laquo; Back to project list</a>
    <h1>Edit project</h1>
    ${await form({
      action: '/project/update',
      message: 'Project updated',
      redirect: '/demo',
      query: {
        id: project.id
      },
      fields: [
        {
          name: 'title',
          value: project.title
        }
      ]
    })}
  `
}