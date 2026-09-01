export function formatDate(date) {
  return new Date(date).toLocaleString();
}

export function truncate(text, length = 120) {

  if (!text) return "";

  if (text.length <= length) return text;

  return text.substring(0, length) + "...";

}