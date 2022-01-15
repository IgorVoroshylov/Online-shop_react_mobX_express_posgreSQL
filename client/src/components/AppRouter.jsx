import { Redirect, Route, Switch } from "react-router-dom";
import { Context } from "../index";
import { privateRoutes, publicRoutes } from "../utils/route";
import { SHOP_ROUTE } from "../utils/consts";
import { useContext } from "react";
import { observer } from "mobx-react-lite";


const AppRouter = observer( () => {
  const {user} = useContext(Context);

  return(
    <Switch>
      {
        user.isAuth && privateRoutes.map(({path, component}) =>
          <Route key={path} path={path} component={component} exact/>
        )
      }
      {
        publicRoutes.map(({path, component}) =>
          <Route key={path} path={path} component={component} exact/>
        )
      }
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  )
});

export default AppRouter;