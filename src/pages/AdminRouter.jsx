import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import NotFound from "../../components/NotFound";
import Login from "./adminLogin/Login";
import Admin from './admin/index'

export default class AdminRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={"/admin/login"} component={Login} />
                <Route path={"/admin"} component={Admin} />
                <Redirect to={"/admin"} />
            </Switch>
        );
    }
}
