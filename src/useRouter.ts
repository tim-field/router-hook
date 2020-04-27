import { useEffect, useState, useCallback } from "react"
import { createBrowserHistory } from "history"

const history = createBrowserHistory()

const toLocation = (path: string) => new URL(path, window.location.href)
const cloneLocation = () => new URL(window.location.href)

function useRouter() {
  const [location, setLocation] = useState(() => cloneLocation())
  const [blocking, setBlocking] = useState(false)
  const [blocked, setBlocked] = useState(false)

  const setRoute = useCallback(
    (path?: string) => {
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
    window.onpopstate = function historyChange(ev: PopStateEvent) {
      if (ev.type === "popstate") {
        setRoute()
      }
    }
  }, [setRoute])

  return [location, setRoute, blocked, setIsBlocking, history]
}

export default useRouter
