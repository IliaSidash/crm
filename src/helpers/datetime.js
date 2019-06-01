export default function datetime(date, format = 'date') {
  let options = {};

  if (format.includes('date')) {
    options = Object.assign(options, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (format.includes('time')) {
    options = Object.assign(options, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
}
