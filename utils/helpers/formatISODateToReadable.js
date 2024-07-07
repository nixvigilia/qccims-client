export default function formatISODateToReadable(isoDate) {
  // Check if the input date string contains a space and replace it with "T"
  const formattedDateStr = isoDate.includes(" ")
    ? isoDate.replace(" ", "T")
    : isoDate;
  const date = new Date(formattedDateStr);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}
