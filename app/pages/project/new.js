const form = require(process.cwd() + '/lib/form.js')

module.exports = async function($) {
  return /* html */`
    <a href="/demo">&laquo; Back to project list</a>
    <h1>New project</h1>
    ${await form({
      action: '/project/create',
      message: 'Project created',
      redirect: '/demo',
      fields: [
        {
          name: 'title'
        }
      ]
    })}
  `
}