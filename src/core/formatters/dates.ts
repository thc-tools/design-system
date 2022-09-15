// Libs
import moment from "moment";

const FORMAT_DATE = "DD/MM/yyyy";
const FORMAT_TIME = "HH:mm";

export function formatDate(date: moment.MomentInput): string {
    return moment(date).format(FORMAT_DATE);
}

export function formatTime(date: moment.MomentInput): string {
    return moment(date).format(FORMAT_TIME);
}

export function formatDateTime(date: moment.MomentInput): string {
    return moment(date).format(`${FORMAT_DATE}, ${FORMAT_TIME}`);
}
