const form = require(process.cwd() + '/lib/form.js')

module.exports = async function($) {
  $.page.title = 'Basic form'

  const project = {}

  return /* html */`
    <a href="/demo/forms">&laquo; Back to form demos</a>
    <h1>Basic form</h1>
    <div class="demo">
      ${await form({
        action: '/project/create',

        // Default is do nothing
        redirect: '',

        // flash if no redirect, cookie if redirect
        message: 'The project was saved',

        // Used for update
        // query: {
        //   id: project.id
        // },

        fields: [
          {
            name: 'title',
            desc: 'This is the project title',
            placeholder: 'Write a title',
            // value: project.name
          },
          {
            name: 'avatar',
            type: 'file',
            upload: '/user/avatar',
            // or with config
            // upload: {
            //   action: '/user/avatar',
            //   config: {
            //     resize: [150, 250]
            //   }
            // }
          }
        ]
      })}
    </div>
  `
}