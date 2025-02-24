export const calculatePayment = (
  principal: number,
  interestRate: number,
  term: number,
  paymentFrequency: string,
  interestOnly: boolean
) => {
  var weekly = 52;
  var fortnightly = 26;
  var monthly = 12;
  var paymentsPerYear = null;
  if (paymentFrequency === "Monthly") {
    paymentsPerYear = monthly;
  } else if (paymentFrequency === "Fortnightly") {
    paymentsPerYear = fortnightly;
  } else if (paymentFrequency === "Weekly") {
    paymentsPerYear = weekly;
  }
  var denominator;
  var numerator;
  var interestRatePerPeriod;
  var numberOfPayments;
  interestRatePerPeriod = interestRate / paymentsPerYear!;
  numberOfPayments = term * 12;
  interestRatePerPeriod /= 100;
  var repayment;
  if (!interestOnly && numberOfPayments > 0) {
    numerator =
      interestRatePerPeriod *
      Math.pow(1 + interestRatePerPeriod, numberOfPayments);
    denominator = Math.pow(1 + interestRatePerPeriod, numberOfPayments) - 1;
    repayment = principal * (numerator / denominator);
  } else {
    repayment = principal * interestRatePerPeriod;
  }
  return repayment.toFixed(2);
};
// type frequency = "Weekly" | "Fortnightly" | "Monthly";

// export const calculatePayment = (
//   principal: number,
//   interestRate: number,
//   term: number,
//   paymentFrequency: frequency,
//   interestOnly: boolean
// ) => {
//   const frequencyMap = {
//     Monthly: 12,
//     Fortnightly: 26,
//     Weekly: 52,
//   };

//   const paymentsPerYear = frequencyMap[paymentFrequency];
//   if (!paymentsPerYear) {
//     throw new Error("Invalid payment frequency");
//   }

//   // Ensure interest rate is correctly handled
//   const annualInterestRate = interestRate / 100; // Convert percentage to decimal
//   const interestRatePerPeriod = annualInterestRate / paymentsPerYear;
//   const numberOfPayments = term * paymentsPerYear;

//   console.log(`Interest Rate Per Period: ${interestRatePerPeriod}`);
//   console.log(`Number of Payments: ${numberOfPayments}`);

//   let repayment;

//   if (!interestOnly) {
//     if (interestRatePerPeriod > 0) {
//       const factor = Math.pow(1 + interestRatePerPeriod, numberOfPayments);
//       repayment = (principal * interestRatePerPeriod * factor) / (factor - 1);
//     } else {
//       repayment = principal / numberOfPayments;
//     }
//   } else {
//     repayment = principal * interestRatePerPeriod; // Interest-only payments
//   }

//   console.log(`Calculated Repayment: ${repayment}`);
//   return repayment.toFixed(2);
// };
