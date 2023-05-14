export const distanceTime = (datetime) => {
    var startDate = new Date();
    var endDate = new Date(datetime)
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    if (seconds <= 60) {
        return seconds + ' giây'
    } else if (seconds <= 3600) {
        return Math.floor(seconds/60) + ' phút'
    } else if (seconds <= 86400) {
        return Math.floor(seconds/3600) + ' giờ'
    } else {
        return Math.floor(seconds/86400) + ' ngày'
    }
};

export const convertToString = (date, type) => {
    const newDate = new Date (date);
    if (type === 'LocaleDateString') {
        return newDate.toLocaleDateString();
    }
}