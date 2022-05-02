### Details

Create details for your list item. Usually used on show pages.

```js
const { size = 2, title = 'Details', desc, edit, del, render } = opt

await details({
  // Size of header html, default is 2 (integer)
  size: 2,

  // Title of details, default is 'Details' (string)
  title: 'Project',

  // Description below title (string)
  desc: 'This is the description of the field',

  // The edit link (string)
  edit: `<a href="/project/${item.id}/edit">Edit</a>`,

  // The delete link (async function)
  del: `<a href="/project/${item.id}/delete">Delete</a>`,

  // Render the item manually (async function)
  render: async function(item) {
    var items = Object.keys(user).map(k => {
      return `<dt>${k}</dt><dd>${esc(user[k])}</dd>`
    })
    return `<dl>${items.join('')}</dl>`
  }
})
```

It produces HTML like this:

```html
<div class="details">
  <nav>
    <a href="/project/1/edit">Edit</a>
    <a href="/project/1/delete">Delete</a>
  </nav>
  <h2>Projects</h2>
  <p>This is the description of the field</p>
  <dl>
    <dt>name</dt>
    <dd>Vidar</dd>
    <dt>email</dt>
    <dd>vidar@example.com</dd>
  </dl>
</div>
```
