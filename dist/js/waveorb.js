(function() {
  var http = function(url, params, options) {
    return new Promise(function(resolve, reject) {
      if (!options) options = {}
      if (!params) params = {}
      var xhr = new XMLHttpRequest()
      xhr.addEventListener('load', function() {
        var json = JSON.parse(xhr.responseText)
        resolve(json)
      })
      xhr.addEventListener('error', function() {
        reject(xhr)
      })
      xhr.open(options.method || 'POST', url + (options.path || ''))
      // Set up upload if we have files
      var data
      if (options.files) {
        data = new FormData()
        // Add params to data
        for (var key in params) {
          data.append(key, JSON.stringify(params[key]))
        }
        // Loop through each of the selected files
        for (var file of options.files) {
          data.append('file', file, file.name)
        }
        if (options.progress) {
          xhr.upload.addEventListener('progress', function(event) {
            event.percent = (event.loaded / event.total * 100).toFixed(2)
            options.progress(event)
          })
        }
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
      }
      if (options.headers) {
        for (var key in options.headers) {
          xhr.setRequestHeader(key, options.headers[key])
        }
      }
      // Send data to server
      xhr.withCredentials = true
      xhr.send(data || JSON.stringify(params))
    })
  };
  window.waveorb = function(host) {
    return function(path, data, options) {
      return http(host + path, data || {}, options || {})
    }
  }
}())