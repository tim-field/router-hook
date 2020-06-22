import { pathToRegexp, Key, compile } from "path-to-regexp"

function getParams<P = {}>(keys: Key[], match: RegExpExecArray): P {
  return keys.reduce(
    (acc, key, i) => ({ [key.name]: match[i + 1], ...acc }),
    {} as P
  )
}

interface Route<P> {
  path: string
  // match(location: string): P | undefined
  match(
    location: string,
    render?: (p: P) => React.ReactElement<React.FunctionComponent<P>>
  ): React.ReactElement<React.FunctionComponent<P>> | undefined | P
  toUrl(params?: object): string
}

export default function route<P = {}>(path: string): Route<P> {
  const keys: Key[] = []
  const regex = pathToRegexp(path, keys)
  const toPath = compile(path)

  const matchLocation = (location: string): P | undefined => {
    const m = regex.exec(location)
    return m ? getParams<P>(keys, m) : undefined
  }

  return {
    path,
    match(location: string, render?: React.FunctionComponent<P>) {
      const params = matchLocation(location)
      if (render) {
        return render(params)
      }
      if (params) {
        return params
      }
      return undefined
    },
    toUrl(params?: object) {
      const defined = params
        ? Object.entries(params).reduce((acc, [k, v]) => {
            return v === undefined ? acc : { ...acc, [k]: v }
          }, {})
        : params

      return toPath(defined) || "/"
    }
  }
}
