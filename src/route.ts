import pathToRegexp from "path-to-regexp"

function getParams(keys: pathToRegexp.Key[], match: RegExpExecArray) {
  return keys.reduce(
    (acc, key, i) => ({ [key.name]: match[i + 1], ...acc }),
    {}
  )
}

export default function route(path: string) {
  const keys: pathToRegexp.Key[] = []
  const regex = pathToRegexp(path, keys)
  const toPath = pathToRegexp.compile(path)

  return {
    match: (location: string, render?: React.FunctionComponent) => {
      const match = regex.exec(location)
      const params = match ? getParams(keys, match) : undefined
      if (params) {
        return render ? render(params) : params
      }
    },
    toUrl: (params: object) => {
      const defined = params
        ? Object.entries(params).reduce((acc, [k, v]) => {
            return v === undefined ? acc : { ...acc, [k]: v }
          }, {})
        : params

      return toPath(defined)
    }
  }
}
