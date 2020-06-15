import React from "react"
import { useSetRoute } from "./Provider"

export default function A(props: React.HTMLProps<HTMLAnchorElement>) {
  const setRoute = useSetRoute()
  return (
    <a
      {...props}
      onClick={ev => {
        console.log("deep", ev)
        ev.persist()
        if (props.onClick) {
          props.onClick(ev)
        }
        ev.preventDefault()
        setRoute(props.href)
      }}
    />
  )
}
