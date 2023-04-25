import { Timestamp } from "firebase/firestore";

export function ts_to_date(ts) {
    return new Timestamp(ts.seconds, ts.nanoseconds).toDate()
}

export function date_to_ts(date) {
    const ts = new Date(date)
    return Timestamp.fromDate(ts)
}