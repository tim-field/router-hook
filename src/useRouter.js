import { useEffect, useState, useCallback } from "react"
import { createBrowserHistory } from "history"

const history = createBrowserHistory()

const toLocation = path => new URL(path, window.location.href)

// without this react won't re-render as location is the same object
// @see https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update
const cloneLocation = () => Object.assign({}, window.location)

function useRouter() {
  const [location, setLocation] = useState(() => cloneLocation())
  const [blocking, setBlocking] = useState(false)
  const [blocked, setBlocked] = useState(false)

  const setRoute = useCallback(
    path => {
      if (!blocking) {
        const newLocation =
          typeof path == "string" ? toLocation(path) : cloneLocation()
        setLocation(newLocation)
        setBlocked(false)
        return true
      } else {
        setBlocked(true)
        return false
      }
    },
    [blocking]
  )

  const setIsBlocking = useCallback(value => {
    setBlocking(value)
    if (value === false) {
      // We should no longer be in a blocked state now
      setBlocked(false)
    }
  }, [])

  useEffect(() => {
    const { pathname, search } = location
    if (window.location.pathname !== pathname) {
      if (!blocking) {
        history.push(pathname)
        setRoute()
      }
    } else if (window.location.search !== search) {
      history.replace(pathname + search)
    }
  }, [location, setRoute, blocking])

  useEffect(() => {
    window.onpopstate = function historyChange(ev) {
      if (ev.type === "popstate") {
        setRoute()
      }
    }
    return () => (window.onpopstate = undefined)
  }, [setRoute])

  return [location, setRoute, blocked, setIsBlocking]
}

export default useRouter
