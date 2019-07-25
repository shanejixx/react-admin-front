import ajax from './ajax';
import jsonp from 'jsonp'
import { message } from 'antd'

const weatherUrl = 'http://api.map.baidu.com/telematics/v3/weather?location=成都&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'

// export let getAssuesLists = () => ajax('https://api.github.com/repos/shanejix/shanejix.github.io/issues');





const BASE = 'http://localhost:3000'
// const BASE = ''
// 登陆
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')


//jsonp天气请求
export let getWeather = () => {
	return new Promise((resolve, reject) => {
		jsonp(weatherUrl, {}, (err, data) => {
			if (!err && data.status === 'success') {
				message.success('weather api request success!')
				const { weather, dayPictureUrl, date } = data.results[0].weather_data[0];
				resolve({ weather, dayPictureUrl, date });
			} else {
				message.error(err.message);
			}
		})
	})
}




