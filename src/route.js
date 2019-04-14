import pathToRegexp from "path-to-regexp"
export default function route(path) {
  const regex = pathToRegexp(path)
  return location => {
    const match = regex.exec(location)
    const render = renderFnc => {
      if (match) {
        return renderFnc(match)
      }
    }
    return { render, match }
  }
}
