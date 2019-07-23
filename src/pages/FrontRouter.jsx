import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import NotFound from "../components/NotFound";

export default class Front extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={"/"} component={Home} />
                {/* <Route path={`/detail/:id`} component={Detail} /> */}
                {/* <Route path={`/:tag`} component={Home} /> */}
                <Route component={NotFound} />
            </Switch>
        );
    }
}
