export default function taskDate(date) {
    var d = (new Date(date) + "").split(" ");
    d[2] = d[2] + ",";
    return [d[0], d[1], d[2], d[3]].join(" ");
}