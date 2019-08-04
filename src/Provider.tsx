import React, { createContext, useContext, useMemo, ReactElement } from "react"
import useRouter from "./useRouter"

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

export default function Provider({ children }: { children: ReactElement }) {
  const [location, setRoute, blocked, setBlocking, history] = useRouter()

  const blockValue = useMemo(() => {
    return [blocked, setBlocking]
  }, [blocked, setBlocking])

  return (
    <Location.Provider value={location}>
      <SetRoute.Provider value={setRoute}>
        <BlockRoute.Provider value={blockValue}>
          <History.Provider value={history}>{children}</History.Provider>
        </BlockRoute.Provider>
      </SetRoute.Provider>
    </Location.Provider>
  )
}
