export default function arraytohtml(array) {
  return `<ul><li>${array.join('</li><li>')}</li><ul>`;
}
