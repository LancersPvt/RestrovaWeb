export const ONBOARDING_FEE = 10000;
export const MINIMUM_MONTHLY_FEE = 5000;
export const SALES_RATE = 0.01;
export function monthlyFee(restrovaProcessedSales: number) {
  if (!Number.isFinite(restrovaProcessedSales) || restrovaProcessedSales < 0) throw new RangeError("Enter a non-negative sales amount.");
  return Math.max(MINIMUM_MONTHLY_FEE, restrovaProcessedSales * SALES_RATE);
}
export function formatPKR(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;
}
