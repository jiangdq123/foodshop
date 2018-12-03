// ajax请求模块
import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET'){
    return new Promise(function(resolve,reject){
        let promise;
        if(type = 'GET') {
            //准备url query参数数据
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if(dataStr !== '') {
                dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }

            // 发送GET请求
            promise = axios.get(url)
        }
        else {
            // 发送POST请求
            promise = aixos.post(url,data)
        }
        promise.then(response => {
            // 若成功 调用resolve
            resolve(response.data)
        })
        .catch(error => {
            // 若失败 调用reject
            reject(error)
        })
    })
}