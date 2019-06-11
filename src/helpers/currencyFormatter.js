export function format(number, currency) {  
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(number);
}
