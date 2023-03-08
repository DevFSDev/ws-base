function getDate()
{
    let today = new Date();
    let date;
    let time='';

    date=today.getFullYear()+'-'

    if(today.getMonth()+1<10){date+='0'+today.getMonth()+1+'-'}
    else {date+=today.getMonth()+1+'-'}
    if(today.getDate()<10){date+='0'+today.getDate() + ' '}
    else {date+=today.getDate()}

    if(today.getHours()<10){time+='0'+today.getHours()+':'}
    else {time+=today.getHours()+':'}
    if(today.getMinutes()<10){time+='0'+today.getMinutes()+':'}
    else {time+=today.getMinutes()+':'}
    if(today.getSeconds()<10){time+='0'+today.getSeconds()}
    else {time+=today.getSeconds()}

    return  date + ' ' + time;
}

module.exports = {
    getDate
}
