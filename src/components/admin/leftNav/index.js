import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import logo from "../../../assets/img/logo.ico";
import menuLists from '../../../config/menuConfig'

import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Nav extends React.Component {

	mapMenuList = (menus) => {
		return menus.map(menu => {

			if (!menu.children) {
				return (
					<Menu.Item key={menu.key}>
						<Link to={menu.key}>
							<Icon type={menu.icon} />
							<span>{menu.title}</span>
						</Link>
					</Menu.Item>
				)
			} else {
				return (
					<SubMenu
						key={menu.key}
						title={
							<span>
								<Icon type={menu.icon} />
								<span>{menu.title}</span>
							</span>
						}
					>
						{this.mapMenuList(menu.children)}
					</SubMenu>
				)
			}
		})

	}

	render() {
		const path = this.props.location.pathname;
		return (
			<div className='left-nav'>
				<Link to='/admin/home'>
					<header className='left-nav-header'>
						<img alt="logo" src={logo} />
						<h1>ADMIN MS</h1>
					</header>
				</Link>

				<Menu
					defaultOpenKeys={['sub1']}
					selectedKeys={[path]}
					mode="inline"
					theme="dark"
				>
					{this.mapMenuList(menuLists)}

				</Menu>
			</div >
		)
	}
}
export default withRouter(Nav);

{/* <Menu

    mode="inline"
    theme="dark"
>
    <Menu.Item key="1">
        <Icon type="pie-chart" />
        <span>Option 1</span>
    </Menu.Item>

</Menu> */}

{/* <Menu.Item key="1">
    <Icon type="pie-chart" />
    <span>Option 1</span>
</Menu.Item> */}

{/* <SubMenu
    key="sub1"
    title={
        <span>
            <Icon type="mail" />
            <span>Navigation One</span>
        </span>
    }
>
    <Menu.Item key="5">Option 5</Menu.Item>
</SubMenu> */}