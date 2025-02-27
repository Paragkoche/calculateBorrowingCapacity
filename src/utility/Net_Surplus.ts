export const NextSurplus = (
  net_income: number,
  total_liberty: number,
  glee: number,
  exp: number,
  in_exp: number
) => {
  // console.log(net_income, total_liberty, glee, in_exp, exp);

  return net_income / 12 - total_liberty - glee - exp - in_exp;
};
