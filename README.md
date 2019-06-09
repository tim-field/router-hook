```JS
// routes.js
import { route } from "router-hook"

export const homeRoute = route("/")
export const registerRoute = route("/register")
export const loginRoute = route("/login")
export const accountRoute = route("/account")
export const editRoute = route("/thing/edit/:id?")

```


```JS
// Router.js
import { useLocation, useSetRoute } from "router-hook"
import {
  homeRoute,
  registerRoute,
  loginRoute,
  accountRoute,
  editRoute
} from "./routes"

function Router() {
  const location = useLocation()
  const setRoute = useSetRoute()
  const [user] = useUser()
  const path = location.pathname


  const auth = render => {
    if (user && user.id) {
      return render
    }
    return () => {
      setRoute(loginRoute.toUrl())
      return null
    }
  }

   return (
    <Default>
      {homeRoute.match(path, () => (
        <Home />
      ))}
      {registerRoute.match(path, () => (
        <Register />
      ))}
      {loginRoute.match(path, () => (
        <Login />
      ))}
      {accountRoute.match(path, auth(() => <Account />))}
      {editRoute.match(path, auth(({ id }) => <Edit id={id} />))}
    </Default>
  )
}
```
