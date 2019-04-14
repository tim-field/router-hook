import React, { createContext, useContext } from "react"
import PropTypes from "prop-types"
import useRouter from "./useRouter"

const SetRoute = createContext(null)
const Location = createContext(null)

export function useSetRoute() {
  return useContext(SetRoute)
}

export function useLocation() {
  return useContext(Location)
}

export default function Provider({ children }) {
  const [location, setRoute] = useRouter()

  return (
    <Location.Provider value={location}>
      <SetRoute.Provider value={setRoute}>{children}</SetRoute.Provider>
    </Location.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired
}
