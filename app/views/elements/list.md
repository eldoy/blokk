### List

Create a list based on an array of items.

```js
await list({
  // Size of header html, default is 2 (integer)
  size: 2,

  // Title of list, default is 'List' (string)
  title: 'Projects',

  // Description below title (string)
  desc: 'This is the description of the field',

  // Create button (string)
  create: `<a href="/project/new">+ Create new project</a>`,

  // List of items to render (async function)
  render: async function() {
    return `<ul>${users.map(user => `<li>${user.name}</li>`).join('')}</ul>`
  },

  // or with array of objects
  render: users,

  // The text or data of the list item (async function)
  item: async function(item) {
    return `${item.name} (${item.email})`
  },

  // The show link (async function)
  show: async function(item) {
    return `<a href="/project/${item.id}/show">Show</a>`
  },

  // The edit link (async function)
  edit: async function(item) {
    return `<a href="/project/${item.id}/edit">Edit</a>`
  },

  // The delete link (async function)
  del: async function(item) {
    return `<a href="/project/${item.id}/delete">Delete</a>`
  }
})
```

It produces HTML like this:

```html
<div class="list">
  <nav>
    <a href="/project/new">+ Create new project</a>
  </nav>
  <h2>Projects</h2>
  <p>This is the description of the field</p>
  <ul>
    <li>
      Vidar (vidar@example.com)
      <nav>
        <a href="/project/1/show">Show</a>
        <a href="/project/1/edit">Edit</a>
        <a href="/project/1/delete">Delete</a>
      </nav>
    </li>
  </ul>
</div>
```
