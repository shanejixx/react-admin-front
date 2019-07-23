import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';


import './index.less'
import { getWeather } from '../../../api'
import formatTime from '../../../utils/formatTimeUtils'
import menuLists from '../../../config/menuConfig'
import memoryUtils from '../../../utils/memoryUtils'
import storeUtils from '../../../utils/storeUtils'

const { confirm } = Modal;

class Header extends React.Component {

    state = {
        currTime: formatTime(new Date()),
        dayPictureUrl: '',
        weather: '',
    }

    updateWeather = async () => {
        let data = await getWeather();
        this.setState({
            dayPictureUrl: data.dayPictureUrl,
            weather: data.weather
        });
    }
    updateTime = () => {
        this.setIntervalId = setInterval(() => {
            this.setState({ currTime: formatTime(new Date()) })
        }, 1000);
    }
    getTitle = () => {
        let path = this.props.location.pathname;

        let title;
        menuLists.forEach(list => {
            if (list.children) {
                list.children.forEach(ele => {
                    if (ele.key === path) {
                        title = ele.title
                    }
                })
            } else {
                if (list.key === path) {
                    title = list.title
                }
            }
        })
        return title
    }
    logOut = () => {
        confirm({
            content: 'Do you Want to logout?',
            onOk: () => {
                storeUtils.removeUser('user_key')
                memoryUtils.user = {}

                this.props.history.replace('/admin')
            }
        });
    }
    componentDidMount() {
        this.updateWeather();
        this.updateTime();
    }
    componentWillUnmount() {
        clearInterval(this.setIntervalId);
    }

    render() {
        let { currTime, dayPictureUrl, weather } = this.state;

        let title = this.getTitle();

        return (
            <header className='header'>
                <section className='header-top'>
                    <span>
                        welcome {memoryUtils.user.username} 
                        <Button style={{ marginLeft:20}}type='danger' onClick={this.logOut}>sign out</Button>
                    </span>
                </section>
                <section className='header-bottom'>
                    <section className='header-bottom-left'>{title}</section>
                    <section className='header-bottom-right'>
                        <span>{currTime}</span>
                        <img alt='weather' src={dayPictureUrl} />
                        <span>{weather}</span>
                    </section>
                </section>
            </header>
        )
    }
}
export default withRouter(Header);