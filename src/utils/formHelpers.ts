import type { ExpirationDate } from "../types/formTypes";

export const isValidExpirationDate = ({ month, year }: ExpirationDate): boolean => {
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  const currentYear = new Date().getFullYear();
  return m >= 1 && m <= 12 && year.length === 4 && y >= currentYear;
}

export const simulate3DSRedirect = (transactionId: string): void => {
  const redirectUrl = `/3ds-simulated-callback?transactionId=${transactionId}`;
  
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 1000);
}
