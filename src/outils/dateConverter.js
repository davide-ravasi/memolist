export const convertDateFromTimestamp = ({ seconds }) => {
    const date = new Date(seconds * 1000);
    const options = { weekday: "short", year: "numeric", month: "long", day: "numeric" };
    const time = date.toLocaleDateString('en-EN', options);

    return time;
}

