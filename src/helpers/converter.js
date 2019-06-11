export function converter (rates) {
  return {
      EUR: 1 / rates.RUB,
      RUB: 1,
      USD: rates.USD / rates.RUB
    };
}