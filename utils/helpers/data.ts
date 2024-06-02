export const getDateTime = (startDate: Date, endDate: Date) => {
    if(startDate.getDate() === endDate.getDate()) {
        return startDate.toDateString().split(' ')[1] + ' ' + startDate.toDateString().split(' ')[2] + ', ' + startDate.toDateString().split(' ')[3];
    }else if(startDate.getMonth() === endDate.getMonth()) {
        return startDate.toDateString().split(' ')[1] + ' ' + startDate.toDateString().split(' ')[2] + ' - ' + endDate.toDateString().split(' ')[2] + 
            ', ' + startDate.toDateString().split(' ')[3];
    }else {
        return startDate.toDateString().split(' ')[1] + ' ' + startDate.toDateString().split(' ')[2] + ' - ' + endDate.toDateString().split(' ')[1] + 
            ' ' + endDate.toDateString().split(' ')[2] + ', ' + startDate.toDateString().split(' ')[3];
    }
}