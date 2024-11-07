import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

// Extend dayjs with the plugins
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function formatTimestamp(timestamp: string): string {
  const date = dayjs(timestamp);

  if (date.isToday()) {
    return date.format("h:mm A"); // Format as time (e.g., 12:30 PM)
  }

  if (date.isYesterday()) {
    return "Yesterday";
  }

  return date.format("DD/MM/YYYY"); // Format as dd/mm/yyyy
}

export function formatcallTimestamp(timestamp: string) {
  const date = dayjs(timestamp);
  const today = dayjs();
  const yesterday = today.subtract(1, "day");

  if (date.isSame(today, "day")) {
    return "Today";
  } else if (date.isSame(yesterday, "day")) {
    return "Yesterday";
  } else {
    return date.format("MMMM D, YYYY [at] h:mm A"); // e.g., "July 25, 2025 at 12:00 AM"
  }
}
