/**
 * Format a date-time string to a readable format
 * Example: "2024-12-18T19:00:00Z" -> "Wed, 18 Dec, 7:00 PM"
 */
export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = days[date.getUTCDay()];
  const dayNum = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${day}, ${dayNum} ${month}, ${hours}:${minutesStr} ${ampm}`;
}

/**
 * Format date only (without time)
 * Example: "2024-12-18T19:00:00Z" -> "Wed, 18 Dec"
 */
export function formatDate(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = days[date.getUTCDay()];
  const dayNum = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  
  return `${day}, ${dayNum} ${month}`;
}

/**
 * Format time only
 * Example: "2024-12-18T19:00:00Z" -> "7:00 PM"
 */
export function formatTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Check if an event is happening this week
 */
export function isThisWeek(dateTimeString: string): boolean {
  const eventDate = new Date(dateTimeString);
  const now = new Date();
  
  const startOfWeek = new Date(now);
  startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay());
  startOfWeek.setUTCHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 7);
  
  return eventDate >= startOfWeek && eventDate < endOfWeek;
}

/**
 * Check if an event is happening today
 */
export function isToday(dateTimeString: string): boolean {
  const eventDate = new Date(dateTimeString);
  const today = new Date();
  
  return (
    eventDate.getUTCDate() === today.getUTCDate() &&
    eventDate.getUTCMonth() === today.getUTCMonth() &&
    eventDate.getUTCFullYear() === today.getUTCFullYear()
  );
}

/**
 * Check if an event is in the past
 */
export function isPast(dateTimeString: string): boolean {
  return new Date(dateTimeString) < new Date();
}




