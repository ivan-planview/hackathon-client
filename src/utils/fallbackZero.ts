export const fallbackZero = (numberLike: unknown) => (isNaN(numberLike) ? 0 : Number(numberLike));
