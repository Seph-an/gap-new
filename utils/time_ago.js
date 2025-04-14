const timeAgo = (inputDate) => {
  const now = new Date();
  const input = new Date(inputDate);

  // Calculate the difference in milliseconds
  const diffInMs = now - input;

  // Convert milliseconds to seconds
  const diffInSeconds = Math.floor(diffInMs / 1000);

  // Calculate days, hours, and minutes
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;

  if (diffInSeconds >= secondsInDay) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds >= secondsInHour) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds >= secondsInMinute) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

export default timeAgo;
