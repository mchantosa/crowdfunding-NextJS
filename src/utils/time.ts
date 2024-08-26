import { formatInTimeZone } from "date-fns-tz";

export function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return `${formatInTimeZone(
    date,
    "America/New_York",
    "dd-MMM-yyyy HH:mm"
  )} EST`;
}

export function getDateFromSeconds(seconds: number | bigint) {
  const secondsAsNumber =
    typeof seconds === "bigint" ? Number(seconds) : seconds;
  const milliseconds = secondsAsNumber * 1000;
  const date = new Date(milliseconds);
  return date;
}
