import * as React from "react"
import PropTypes from "prop-types"
import useRouter from "./useRouter"

const { createContext, useContext, useMemo } = React

const SetRoute = createContext(null)
const Location = createContext(null)
const BlockRoute = createContext(null)
const History = createContext(null)

export function useSetRoute() {
  return useContext(SetRoute)
}

export function useLocation() {
  return useContext(Location)
}

export function useBlockRoute() {
  return useContext(BlockRoute)
}

export function useHistory() {
  return useContext(History)
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [location, setRoute, blocked, setBlocking, history] = useRouter()

  const blockValue = useMemo(() => {
    return [blocked, setBlocking]
  }, [blocked, setBlocking])

  return React.createElement(
    Location.Provider,
    { value: location },
    React.createElement(
      SetRoute.Provider,
      { value: setRoute },
      React.createElement(
        BlockRoute.Provider,
        { value: blockValue },
        React.createElement(History.Provider, { value: history }, children)
      )
    )
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  preRoute: PropTypes.func
}
