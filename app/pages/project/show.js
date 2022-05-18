const details = require(process.cwd() + '/lib/details.js')

module.exports = async function($) {
  const project = await $.db('project').get({ id: $.query.project_id })

  return /* html */`
    <a href="/demo">&laquo; Back to project list</a>
    <h1>Show project</h1>
    ${details({
      title: 'Project details',
      item: project
    })}
  `
}