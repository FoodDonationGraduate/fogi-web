export const distanceTime = (datetime) => {
    var startDate = new Date();
    var endDate = new Date(datetime)
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    if (seconds < 0) {
        return 'Đã hết hạn'
    } else if (seconds <= 60) {
        return seconds + ' giây'
    } else if (seconds <= 3600) {
        return Math.floor(seconds/60) + ' phút'
    } else if (seconds <= 86400) {
        return Math.floor(seconds/3600) + ' giờ'
    } else {
        return Math.floor(seconds/86400) + ' ngày'
    }
};

export const getRelativeTime = (datetime) => {
    var startDate = new Date();
    var endDate = new Date(datetime);
    var seconds = (startDate.getTime() - endDate.getTime()) / 1000;
    if (seconds < 60) {
        return seconds + ' giây'
    } else if (seconds <= 3600) {
        return Math.floor(seconds/60) + ' phút'
    } else if (seconds <= 86400) {
        return Math.floor(seconds/3600) + ' giờ'
    } else {
        return Math.floor(seconds/86400) + ' ngày'
    }
};

export const getShortDate = (datetime) => {
    const [date, time] = datetime.split(' ');
    const [yyyy, mm, dd] = date.split('-');
    return `${dd}/${mm}/${yyyy.slice(2, 4)}`
}

export const convertToString = (date, type) => {
    const newDate = new Date (date);
    if (type === 'LocaleDateString') {
        return newDate.toLocaleDateString();
    } else if (type === 'LocaleString') {
        return newDate.toLocaleString();
    } else if (type === 'LocaleTimeString') {
        return newDate.toLocaleTimeString();
    }
}