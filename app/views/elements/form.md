### Form

```js
await form({
  // The save button field (async function or string)
  // Default is a button that calls the save function
  button: `<button onclick="handleSave(this)">Save</button>`,

  // The form fields (array). Supports:
  // - text
  // - textarea
  // - select
  // - radio
  // - markup (code editor)
  // - file
  // - hidden
  // and all other built in input types...
  fields: [{
    name: 'hello',
    type: 'text'
  }],

  // Scripts to be run after form creation (async function)
  init: async function() {
    // Set up editor etc...
  },

  // The upload handle function. Used with file fields (async function)
  upload: async function(input) {
    var urls = await api('/upload/create', {},
      {
        files: input.files,
        progress: function (event) {
          var { loaded, total, percent } = event
          text('.progress', `${(loaded / 1024).toFixed(2)} kB/${(total / 1024).toFixed(2)} kB, ${percent}%`)
        }
      }
    )
    if (urls && urls.length) {
      html('.result', urls.map(url => `<img src="${url}">`), 'end')
    }
  },

  // Added to the button, handles saving of form field data
  save: async function(btn) {
    btn.disabled = true
    const values = serialize(btn.form)
    const result = await api('/project/create', { values })
    if (!showErrors(result)) {
      cookie('flash', 'Project created')
      return location = '/project/list'
    }
    btn.disabled = false
  }
})

```

It will produce HTML like this:
```html
<form onsubmit="return false">
  <p>
    <label for="hello">hello</label><br>
    <input id="hello" type="text" name="hello" oninput="clearErrors(this)" data-default="">
    <em class="hello-errors"></em>
  </p>
  <button onclick="handleSave(this)">Save</button>
</form>
<script>(async function() {
  // Set up editor etc...
}())</script>
```
