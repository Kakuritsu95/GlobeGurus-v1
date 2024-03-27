export default function formatDateString(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString().split(",")[0];

  return formattedDate;
}
