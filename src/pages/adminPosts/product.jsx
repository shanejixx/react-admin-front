import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'

import './product.less'

/*
商品路由
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/admin/posts' component={ProductHome} exact/> {/*路径完全匹配*/}
        <Route path='/admin/posts/addupdate' component={ProductAddUpdate}/>
        <Route path='/admin/posts/detail' component={ProductDetail}/>
        <Redirect to='/admin/posts'/>
      </Switch>
    )
  }
}