
let format = (number) => {
  return number > 9 ? number : '0' + number;
}

const formatTime = (time) => {
  if (!time) return ''
  let date = new Date(time)
  return date.getFullYear() + ' 年 ' + format((date.getMonth() + 1)) + ' 月 ' + format(date.getDate())
    + ' 日 ' + format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds())
}
export default formatTime;