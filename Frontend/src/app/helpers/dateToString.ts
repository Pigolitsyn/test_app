import { Date} from "../interfaces";

export function dateToString(date: Date) {
  return `${date.year}-${date.month}-${date.day}`
}
