import { useEffect, useState, useCallback } from "react"
import { createBrowserHistory } from "history"

const history = createBrowserHistory()

const toLocation = path => new URL(path, window.location.href)

// without this react won't re-render as location is the same object
// @see https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update
const cloneLocation = () => Object.assign({}, window.location)

function useRouter(initial = "") {
  const [location, setLocation] = useState(
    initial ? toLocation(initial) : cloneLocation()
  )

  const setRoute = useCallback(path => setLocation(toLocation(path)), [])

  useEffect(() => {
    const { pathname, search } = location
    if (window.location.pathname !== pathname) {
      history.push(pathname)
      setLocation(cloneLocation())
    } else if (window.location.search !== search) {
      history.replace(pathname + search)
    }
  }, [location])

  useEffect(() => {
    window.onpopstate = function historyChange(ev) {
      if (ev.type === "popstate") {
        setLocation(cloneLocation())
      }
    }
  }, [])

  return [location, setRoute]
}

export default useRouter
