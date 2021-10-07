// Libs
import moment from "moment";

const FORMAT_DATE = "DD/MM/yyyy";
const FORMAT_TIME = "HH:mm";

export function formatDate(date) {
    return moment(date).format(FORMAT_DATE);
}

export function formatTime(date) {
    return moment(date).format(FORMAT_TIME);
}

export function formatDateTime(date) {
    return moment(date).format(`${FORMAT_DATE}, ${FORMAT_TIME}`);
}
