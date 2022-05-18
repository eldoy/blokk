(function(){
  /* Data **
  ***********************/

  const computedStack = []
  const observersMap = new WeakMap()
  const computedDependenciesTracker = new WeakMap()


  /* Utility functions **
  ***********************/

  function isObj(object) {
    return object && typeof object === 'object'
  }

  function setHiddenKey(object, key, value) {
    Object.defineProperty(object, key, {
      value,
      enumerable: false,
      configurable: true
    })
  }

  function defineBubblingProperties(object, key, parent) {
    setHiddenKey(object, '__key', key)
    setHiddenKey(object, '__parent', parent)
  }

  const BIND_IGNORED = [
    'String',
    'Number',
    'Object',
    'Array',
    'Boolean',
    'Date'
  ]

  function getInstanceMethodKeys(object) {
    return (
      Object
      .getOwnPropertyNames(object)
      .concat(
        Object.getPrototypeOf(object) &&
        BIND_IGNORED.indexOf(Object.getPrototypeOf(object).constructor.name) < 0 ?
        Object.getOwnPropertyNames(Object.getPrototypeOf(object)) : []
      )
      .filter(prop => prop !== 'constructor' && typeof object[prop] === 'function')
    )
  }


  /* Observe **
  ***********************/

  let timeout = null
  const queue = new Set()

  function process() {
    for (const task of queue) {
      task()
    }
    queue.clear()
    timeout = null
  }

  function enqueue(task, batch) {
    if (timeout === null)
      timeout = setTimeout(process, batch === true ? 0 : batch)
    queue.add(task)
  }

  function observe(obj, options = {}) {
    // 'deep' is slower but reasonable; 'shallow' a performance enhancement but with side-effects
    const {
      props,
      ignore,
      batch,
      deep = true,
      bubble,
      bind
    } = options

    // Ignore if the object is already observed
    if (obj.__observed) {
      return obj
    }

    // If the prop is explicitely not excluded
    const isWatched = (prop, value) =>
      (
        !props ||
        props instanceof Array && props.includes(prop) ||
        typeof props === 'function' && props(prop, value)
      ) && (
        !ignore ||
        !(ignore instanceof Array && ignore.includes(prop)) &&
        !(typeof ignore === 'function' && ignore(prop, value))
      )

    // Add the object to the observers map.
    observersMap.set(obj, new Map())

    // If the deep flag is set, observe nested objects/arrays
    if (deep) {
      Object.entries(obj).forEach(function([key, val]) {
        if (isObj(val) && isWatched(key, val)) {
          obj[key] = observe(val, options)
          // If bubble is set, we add keys to the object used to bubble up the mutation
          if (bubble) {
            defineBubblingProperties(obj[key], key, obj)
          }
        }
      })
    }

    // Proxify the object in order to intercept get/set on props
    const proxy = new Proxy(obj, {
      get(_, prop) {
        if (prop === '__observed')
          return true

        // If the prop is watched
        if (isWatched(prop, obj[prop])) {
          // If a computed function is being run
          if (computedStack.length) {
            const propertiesMap = observersMap.get(obj)
            if (!propertiesMap.has(prop))
              propertiesMap.set(prop, new Set())
            // Tracks object and properties accessed during the function call
            const tracker = computedDependenciesTracker.get(computedStack[0])
            if (tracker) {
              if (!tracker.has(obj)) {
                tracker.set(obj, new Set())
              }
              tracker.get(obj).add(prop)
            }
            // Link the computed function and the property being accessed
            propertiesMap.get(prop).add(computedStack[0])
          }
        }

        return obj[prop]
      },
      set(_, prop, value) {
        if (prop === '__handler') {
          // Don't track bubble handlers
          setHiddenKey(obj, '__handler', value)
        } else if (!isWatched(prop, value)) {
          // If the prop is ignored
          obj[prop] = value
        } else if (Array.isArray(obj) && prop === 'length' || obj[prop] !== value) {
          // If the new/old value are not equal
          const deeper = deep && isObj(value)
          const propertiesMap = observersMap.get(obj)

          // Remove bubbling infrastructure and pass old value to handlers
          const oldValue = obj[prop]
          if (isObj(oldValue))
            delete obj[prop]

          // If the deep flag is set we observe the newly set value
          obj[prop] = deeper ? observe(value, options) : value

          // Co-opt assigned object into bubbling if appropriate
          if (deeper && bubble) {
            defineBubblingProperties(obj[prop], prop, obj)
          }

          const ancestry = [prop]
          let parent = obj
          while (parent) {
            // If a handler explicitly returns 'false' then stop propagation
            if (parent.__handler && parent.__handler(ancestry, value, oldValue, proxy) === false) {
              break
            }
            // Continue propagation, traversing the mutated property's object hierarchy & call any __handlers along the way
            if (parent.__key && parent.__parent) {
              ancestry.unshift(parent.__key)
              parent = parent.__parent
            } else {
              parent = null
            }
          }

          const dependents = propertiesMap.get(prop)
          if (dependents) {
            // Retrieve the computed functions depending on the prop
            for (const dependent of dependents) {
              const tracker = computedDependenciesTracker.get(dependent)
              // If the function has been disposed or if the prop has not been used
              // during the latest function call, delete the function reference
              if (dependent.__disposed || tracker && (!tracker.has(obj) || !tracker.get(obj).has(prop))) {
                dependents.delete(dependent)
              } else if (dependent !== computedStack[0]) {
                // Run the computed function
                if (batch) {
                  enqueue(dependent, batch)
                } else {
                  dependent()
                }
              }
            }
          }
        }

        return true
      }
    })

    if (bind) {
      // Need this for binding es6 classes methods which are stored in the object prototype
      getInstanceMethodKeys(obj).forEach(key => obj[key] = obj[key].bind(proxy))
    }

    return proxy
  }


  /* Computed **
  ***********************/

  function computed(wrappedFunction, {
    autoRun = true,
    callback,
    bind,
    disableTracking = false
  } = {}) {
    // Proxify the function in order to intercept the calls
    const proxy = new Proxy(wrappedFunction, {
      apply(target, thisArg, argsList) {
        function observeComputation(fun) {
          // Track object and object properties accessed during this function call
          if (!disableTracking) {
            computedDependenciesTracker.set(callback || proxy, new WeakMap())
          }
          // Store into the stack a reference to the computed function
          computedStack.unshift(callback || proxy)
          // Run the computed function - or the async function
          const result = fun ?
            fun() :
            target.apply(bind || thisArg, argsList)
          // Remove the reference
          computedStack.shift()
          // Return the result
          return result
        }

        // Inject the computeAsync argument which is used to manually declare when the computation takes part
        argsList.push({
          computeAsync: function(target) {
            return observeComputation(target)
          }
        })

        return observeComputation()
      }
    })

    // If autoRun, then call the function at once
    if (autoRun) {
      proxy()
    }

    return proxy
  }


  /* Dispose **
  ***********************/

  function dispose(computedFunction) {
    computedDependenciesTracker.delete(computedFunction)
    return computedFunction.__disposed = true
  }

  window.observe = observe
  window.computed = computed
  window.dispose = dispose
}());