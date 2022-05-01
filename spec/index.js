const test = require('spekky')

async function run() {
  // ... start a server or do some setup

  // Start timer
  console.time('Test run')

  await test('details')
  await test('form')
  await test('list')

  // End timer
  console.timeEnd('Test run')
}
run()
