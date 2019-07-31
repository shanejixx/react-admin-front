import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import logo from "../../../assets/img/logo.ico";
import menuList from '../../../config/menuConfig'

import memoryUtils from "../../../utils/memoryUtils";

import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Nav extends React.Component {

	/*
	判断当前登陆用户对item是否有权限
	 */
	hasAuth = (item) => {
		const { key, isPublic } = item

		console.log(memoryUtils.user.role.menus)
		const menus = memoryUtils.user.role.menus
		const username = memoryUtils.user.username
		/*
		1. 如果当前用户是admin
		2. 如果当前item是公开的
		3. 当前用户有此item的权限: key有没有menus中
		 */
		if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
			return true
		} else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
			return !!item.children.find(child => menus.indexOf(child.key) !== -1)
		}

		return false
	}

	/*
	根据menu的数据数组生成对应的标签数组
	使用map() + 递归调用
	*/
	getMenuNodes_map = (menuList) => {
		return menuList.map(item => {
			/*
			  {
				title: '首页', // 菜单标题名称
				key: '/home', // 对应的path
				icon: 'home', // 图标名称
				children: [], // 可能有, 也可能没有
			  }
	  
			  <Menu.Item key="/home">
				<Link to='/home'>
				  <Icon type="pie-chart"/>
				  <span>首页</span>
				</Link>
			  </Menu.Item>
	  
			  <SubMenu
				key="sub1"
				title={
				  <span>
					<Icon type="mail"/>
					<span>商品</span>
				  </span>
				}
			  >
				<Menu.Item/>
				<Menu.Item/>
			  </SubMenu>
			*/
			if (!item.children) {
				return (
					<Menu.Item key={item.key}>
						<Link to={item.key}>
							<Icon type={item.icon} />
							<span>{item.title}</span>
						</Link>
					</Menu.Item>
				)
			} else {
				return (
					<SubMenu
						key={item.key}
						title={
							<span>
								<Icon type={item.icon} />
								<span>{item.title}</span>
							</span>
						}
					>
						{this.getMenuNodes(item.children)}
					</SubMenu>
				)
			}

		})
	}

	/*
	根据menu的数据数组生成对应的标签数组
	使用reduce() + 递归调用
	*/
	getMenuNodes = (menuList) => {
		// 得到当前请求的路由路径
		const path = this.props.location.pathname

		return menuList.reduce((pre, item) => {

			// 如果当前用户有item对应的权限, 才需要显示对应的菜单项
			if (this.hasAuth(item)) {
				// 向pre添加<Menu.Item>
				if (!item.children) {
					pre.push((
						<Menu.Item key={item.key}>
							<Link to={item.key}>
								<Icon type={item.icon} />
								<span>{item.title}</span>
							</Link>
						</Menu.Item>
					))
				} else {

					// 查找一个与当前请求路径匹配的子Item
					const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
					// 如果存在, 说明当前item的子列表需要打开
					if (cItem) {
						this.openKey = item.key
					}


					// 向pre添加<SubMenu>
					pre.push((
						<SubMenu
							key={item.key}
							title={
								<span>
									<Icon type={item.icon} />
									<span>{item.title}</span>
								</span>
							}
						>
							{this.getMenuNodes(item.children)}
						</SubMenu>
					))
				}
			}

			return pre
		}, [])
	}

	/*
	在第一次render()之前执行一次
	为第一个render()准备数据(必须同步的)
	 */
	componentWillMount() {
		this.menuNodes = this.getMenuNodes(menuList)
	}

	render() {
		// debugger
		// 得到当前请求的路由路径
		let path = this.props.location.pathname
		console.log('render()', path)
		if (path.indexOf('/product') === 0) { // 当前请求的是商品或其子路由界面
			path = '/product'
		}

		// 得到需要打开菜单项的key
		const openKey = this.openKey

		return (
			<div className="left-nav">
				<Link to='/' className="left-nav-header">
					<img src={logo} alt="logo" />
					<h1>S_CMS</h1>
				</Link>

				<Menu
					mode="inline"
					theme="dark"
					selectedKeys={[path]}
					defaultOpenKeys={[openKey]}
				>

					{
						this.menuNodes
					}

				</Menu>
			</div>
		)
	}
}


// class Nav extends React.Component {

// 	mapMenuList = (menus) => {
// 		return menus.map(menu => {

// 			if (!menu.children) {
// 				return (
// 					<Menu.Item key={menu.key}>
// 						<Link to={menu.key}>
// 							<Icon type={menu.icon} />
// 							<span>{menu.title}</span>
// 						</Link>
// 					</Menu.Item>
// 				)
// 			} else {
// 				return (
// 					<SubMenu
// 						key={menu.key}
// 						title={
// 							<span>
// 								<Icon type={menu.icon} />
// 								<span>{menu.title}</span>
// 							</span>
// 						}
// 					>
// 						{this.mapMenuList(menu.children)}
// 					</SubMenu>
// 				)
// 			}
// 		})

// 	}

// 	render() {
// 		let path = this.props.location.pathname;
// 		console.log(path,typeof path)

// 		path = '/admin/'+path.split('/')[2];

// 		return (
// 			<div className='left-nav'>
// 				<Link to='/admin/home'>
// 					<header className='left-nav-header'>
// 						<img alt="logo" src={logo} />
// 						<h1>ADMIN MS</h1>
// 					</header>
// 				</Link>

// 				<Menu
// 					defaultOpenKeys={['sub1']}
// 					selectedKeys={[path]}
// 					mode="inline"
// 					theme="dark"
// 				>
// 					{this.mapMenuList(menuLists)}

// 				</Menu>
// 			</div >
// 		)
// 	}
// }
export default withRouter(Nav);

