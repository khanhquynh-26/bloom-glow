export function formatCurrency(value: string): string {
  const amount = BigInt(value || '0');

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}