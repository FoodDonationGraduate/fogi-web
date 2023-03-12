export const distanceTime = (datetime) => {
    var startDate = new Date();
    var endDate = new Date(datetime)
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    if (seconds <= 60) {
        return 'Còn ' + seconds + ' giây'
    } else if (seconds <= 3600) {
        return 'Còn ' + Math.floor(seconds/60) + ' phút'
    } else if (seconds <= 86400) {
        return 'Còn ' + Math.floor(seconds/3600) + ' giờ'
    } else {
        return 'Còn ' + Math.floor(seconds/86400) + ' ngày'
    }
};