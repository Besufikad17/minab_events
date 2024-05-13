function getDateTime(startDate: Date, endDate: Date) {
    if(startDate === endDate) {
        return startDate.toDateString();
    }else if(startDate.getMonth() === endDate.getMonth()) {
        return `${startDate.toDateString()} - ${endDate.getDate()}`;
    }
}