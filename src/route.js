import pathToRegexp from "path-to-regexp"

function getParams(keys, match) {
  return keys.reduce(
    (acc, key, i) => ({ [key.name]: match[i + 1], ...acc }),
    {}
  )
}

export default function route(path) {
  const keys = []
  const regex = pathToRegexp(path, keys)
  const toPath = pathToRegexp.compile(path)

  return {
    match: (location, render) => {
      const match = regex.exec(location)
      const params = match ? getParams(keys, match) : undefined
      if (params) {
        return render ? render(params) : params
      }
    },
    toUrl: params => {
      return toPath(params)
    }
  }
}
