import type { Bookmark } from "~/types/bookmark";
import type { Reservation } from "~/types/reservation";
import type { Tag } from "~/types/tags";

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

export const getTagsList = (tags: Tag[]) => {
    return tags.map(tag => tag.name).join();
}

export const isBookmarked = (userId: number, bookmarks: Bookmark[]) => {
    return bookmarks.some(bookmark => bookmark.user_id === userId);
}

export const isReserved = (userId: number, reservations: Reservation[]) => {
    return reservations.some(reservation => reservation.user_id === userId);
}