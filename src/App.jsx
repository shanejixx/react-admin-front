import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import FrontRouter from './pages/FrontRouter';
import AdminRouter from './pages/AdminRouter';
import NotFound from './components/NotFound';


export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/404" component={NotFound} />
                    <Route path="/admin" component={AdminRouter} />
                    <Route component={FrontRouter} />
                </Switch>
            </Router>
        );
    }
}
