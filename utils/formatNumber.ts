export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat("ja-JP").format(digit);
};
