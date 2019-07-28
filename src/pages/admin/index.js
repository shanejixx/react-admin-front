import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import LeftNav from "../../components/admin/leftNav";
import Header from "../../components/admin/header";
import Footer from "../../components/admin/footer";

import memoryUtils from "../../utils/memoryUtils";

import Categories from '../adminCategories'
import Charts from '../adminCharts'
import Me from '../adminMe'
// import Posts from '../adminPosts'
import Posts from '../adminPosts/product'
import Roles from '../adminRoles'
import Tags from '../adminTags'
import Users from '../adminUsers'
import Home from '../adminHome'

const { Sider, Content} = Layout;

export default class Admin extends React.Component {
    render() {
        if (!memoryUtils.user || !memoryUtils.user.username) {
            return <Redirect to="/admin/login" />;
        }
        return (
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                    <LeftNav />
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header>hello {memoryUtils.user.username}
                    </Header>
                    <Content style={{ margin: 25, marginTop:100,backgroundColor: 'white', overflow: 'initial' }}>
                        <Switch>

                            <Route path='/admin/categories' component={Categories} />
                            <Route path='/admin/charts' component={Charts} />
                            <Route path='/admin/aboutme' component={Me} />
                            <Route path='/admin/posts' component={Posts} />
                            <Route path='/admin/roles' component={Roles} />
                            <Route path='/admin/tags' component={Tags} />
                            <Route path='/admin/users' component={Users} />
                            <Route path='/admin/home' component={Home} />
                            <Redirect to={'/admin/home'} />
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        );
    }
}
