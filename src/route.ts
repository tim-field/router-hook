import { pathToRegexp, Key, compile } from "path-to-regexp"
import { ReactNode } from "react"

function getParams<P = Record<string, string>>(
  keys: Key[],
  match: RegExpExecArray
): P {
  return keys.reduce(
    (acc, key, i) => ({ [key.name]: match[i + 1], ...acc }),
    {} as P
  )
}

interface Route<P = Record<string, string>> {
  path: string
  match(
    location: string,
    render?: (p: P) => ReactNode
  ): ReactNode | P | undefined
  toUrl(params?: P): string
}

export default function route<P = Record<string, string>>(
  path: string
): Route<P> {
  const keys: Key[] = []
  const regex = pathToRegexp(path, keys)
  const toPath = compile(path)

  const matchLocation = (location: string): P | undefined => {
    const m = regex.exec(location)
    return m ? getParams<P>(keys, m) : undefined
  }

  return {
    path,
    match(location: string, render?: (p: P) => ReactNode) {
      const matched = matchLocation(location)
      if (matched) {
        return render ? render(matched) : matched
      }
      return undefined
    },
    toUrl(params?: P) {
      const defined = params
        ? Object.entries(params).reduce((acc, [k, v]) => {
            return v === undefined ? acc : { ...acc, [k]: v }
          }, {})
        : params

      return toPath(defined) || "/"
    }
  }
}
