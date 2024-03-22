export const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('ja', {
        style: 'currency',
        currency: 'JPY',
        currencyDisplay: 'symbol',
    }).format(amount);
}