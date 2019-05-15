import React, { createContext, useContext, useMemo } from "react"
import PropTypes from "prop-types"
import useRouter from "./useRouter"

const SetRoute = createContext(null)
const Location = createContext(null)
const BlockRoute = createContext(null)

export function useSetRoute() {
  return useContext(SetRoute)
}

export function useLocation() {
  return useContext(Location)
}

export function useBlockRoute() {
  return useContext(BlockRoute)
}

export default function Provider({ children }) {
  const [location, setRoute, blocked, setBlocking] = useRouter()

  const blockValue = useMemo(() => {
    return [blocked, setBlocking]
  }, [blocked, setBlocking])

  return (
    <Location.Provider value={location}>
      <SetRoute.Provider value={setRoute}>
        <BlockRoute.Provider value={blockValue}>{children}</BlockRoute.Provider>
      </SetRoute.Provider>
    </Location.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  preRoute: PropTypes.func
}
