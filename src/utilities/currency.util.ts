export function formatMoney(
  amount: number,
  currency: string = "THB",
  locale: string = "th-TH",
): string {
  const fractionDigits = getCurrencyFractionDigits(currency);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

function getCurrencyFractionDigits(currency: string): number {
  const zeroDecimalCurrencies = ["JPY", "KRW"];
  const threeDecimalCurrencies = ["KWD", "BHD"];

  if (zeroDecimalCurrencies.includes(currency)) return 0;
  if (threeDecimalCurrencies.includes(currency)) return 3;

  return 2;
}
