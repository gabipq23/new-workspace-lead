export const formatPrice = (price: string | number, users: number = 1) => {
  const numericPrice =
    typeof price === "string" ? parseFloat(price.replace(",", ".")) : price;
  const total = numericPrice * users;
  return total.toFixed(2).replace(".", ",");
};
