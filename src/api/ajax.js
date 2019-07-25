import axios from 'axios'
import { message } from 'antd';


let ajax = (url, data = {}, type = "GET") => {
    return new Promise((resolve, reject) => {
        let promise;
        if (type === 'GET') {
            promise = axios.get(url, { params:data })
        }
        if (type === 'POST') {
            promise = axios.post(url, data)
        }

        promise.then(result => {
            message.success('request success')
            resolve(result.data)
        }).catch(e => {
            message.error('request error'+e.message);
        })
    })


}
export default ajax;