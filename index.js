(function(global) {

  onReady(init)

  function init() {
    waitz(retrieve(locate()), reify))
  }

  function locate() {
    return Array.prototype.slice.call(
      document.querySelectorAll('script[type="text/babel"]')
    )
  }

  function retrieve(scripts) {
    return scripts.map(function (script) {
      return !!script.src
      ? load(script)
      : extract(script)
    })
  }

  function load(script) {
    return function (next) {
      loadUrl(script.src, function (source) {
        next({
          name: script.src,
          source: source
        })
      })
    }
  }

  function extract(script) {
    return function (next) {
      next({
        name: 'inline',
        source: script.innerHTML
      })
    }
  }

  function reify(scripts) {
    return scripts.map(function (script) {
      var opts = {
        filename: script.name
      }
      opts.sourceMaps = "inline"
      opts.presets = [ "react" ]
      return new Function(Babel.transform(script.source, opts).code)()
    })
  }



  function onReady(init) {
    if (global.addEventListener) {
      global.addEventListener("DOMContentLoaded", init, false)
    } else if (global.attachEvent) {
      global.attachEvent("onload", init)
    }
  }

  function loadUrl(url, next) {
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        next(this.response)
      } else {
        console.log('Failed to load ' + url)
        next()
      }
    }
    request.onerror = function () {
      console.log('Failed to load ' + url)
      next()
    }
    request.send(null)
  }

  function waitz(tasks, callback) {

    var results = []
    if (!tasks.length) {
      return callback(results)
    }

    function completed(index) {
      return function (result) {
        results[index] = result
        if (results.length === tasks.length) {
          callback(results)
        }
      }
    }

    tasks.forEach(function (task, i) {
      task(completed(i))
    })

  }

}(window));
