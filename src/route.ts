import { pathToRegexp, Key, compile } from "path-to-regexp"
import { ReactNode } from "react"

function getParams<P = Record<string, string>>(
  keys: Key[],
  match: RegExpExecArray,
): P {
  return keys.reduce(
    (acc, key, i) => ({ [key.name]: match[i + 1], ...acc }),
    {} as P,
  )
}

type Route<
  P extends Record<string, string> = Record<string, string>,
  D extends Record<string, unknown> = Record<string, unknown>,
> = {
  path: string
  match(
    location: string,
    render: (p: P & D) => ReactNode,
    prepare?: (p: P) => D,
  ): ReactNode
  toUrl(params?: P): string
}

export default function route<
  P extends Record<string, string> = Record<string, string>,
  D extends Record<string, unknown> = Record<string, unknown>,
>(path: string): Route<P, D> {
  const keys: Key[] = []
  const regex = pathToRegexp(path, keys)
  const toPath = compile(path)

  const matchLocation = (location: string): P | undefined => {
    const m = regex.exec(location)
    return m ? getParams<P>(keys, m) : undefined
  }

  const res: Route<P, D> = {
    path,
    match(location, render, prepare) {
      const matched = matchLocation(location)
      if (matched) {
        const data = {
          ...matched,
          ...(prepare ? prepare(matched) : undefined),
        }
        return render(data)
      }
      return null
    },
    toUrl(params) {
      const defined = params
        ? Object.entries(params).reduce((acc, [k, v]) => {
            return v === undefined ? acc : { ...acc, [k]: v }
          }, {})
        : params

      return toPath(defined) || "/"
    },
  }
  return res
}
