import { format, formatDistanceToNow } from "date-fns";
export default function taskDate(date = "") {
  let time = format(new Date(date), "dd MMMM yyyy 'at' p");
  return time;
}
