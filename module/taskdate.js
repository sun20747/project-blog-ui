import { format, formatDistanceToNow } from "date-fns";
export default function taskDate(date) {
  var d = (new Date(date) + "").split(" ");
  d[2] = d[2] + ",";
  return [d[0], d[1], d[2], d[3]].join(" ");
  // let time = format(new Date(date), "dd/MM/yyyy hh:mm");
  // return time;
}
