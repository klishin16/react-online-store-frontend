import React from 'react';
import {privateRoutes, publicRoutes, RouteNames} from "../routes/routerPaths";
import {Switch, Route, Redirect} from "react-router-dom"
import {userTypedSelector} from "../hooks/userTypedSelector";

const AppRouter = () => {
    const {isAuth} = userTypedSelector(state => state.auth)
    return (
        isAuth ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                        key={route.path}
                    />
                )}
                <Redirect to={RouteNames.INDEX} />
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                        key={route.path}
                    />
                )}
                <Redirect to={RouteNames.LOGIN} />
            </Switch>

    );
};

export default AppRouter;
