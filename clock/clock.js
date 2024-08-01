function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var clockText = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    document.getElementById('clock').textContent = clockText;
}
setInterval(updateClock, 1000);
updateClock();
function goBack() {
    window.history.back();
}
