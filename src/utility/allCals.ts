
import { Hem, textLevels } from "./hem_cal";
import { loanRepayments } from "./loan_repayment";
import { NextSurplus } from "./Net_Surplus";

type Frequency = "Weekly" | "Fortnightly" | "Monthly" | "Annual";
export const calculateLoan = (
  payment: number,
  interestRate: number,
  term: number
) => {
  const periods = { Weekly: 52, Fortnightly: 26, Monthly: 12 };
  const ratePerPeriod = interestRate / (periods.Monthly * 100);
  const numPayments = term * periods.Monthly;
  return (
    (payment * (1 - Math.pow(1 + ratePerPeriod, -numPayments))) / ratePerPeriod
  );
};
type formDataType = {
  numberOfApplicants: 1 | 0;
  numberOfDependant: number;
  loanTerm: number;
  incomeType: number;
  frequency: Frequency;
  rawSalary: number;
   is_newLoan: boolean;
  loanRepayments: number;
  expenseFrequency: Frequency;
  estimatedLivingExpense: number;
  proposed_home_loans: number;
  join_rawSalary?: number;
    bonus: number;
  join_bonus?: number;
  loan_rate:number;
};
const frequencies_data: { [key in Frequency]: number } = {
  Annual: 1,
  Monthly: 12,
  Fortnightly: 26,
  Weekly: 52,
};
const bonus = {
  nab:1,
  amp:0.8,
  westpac:0.8
}
export const Cal = (
  bank: "nab" | "amp" | "westpac",
  data: formDataType,
  buffer: number
) => {
  const application1 =
    data.rawSalary * frequencies_data[data.frequency] +
    data.bonus * bonus[bank];
  const application2 =
    (data.join_rawSalary ?? 0) * frequencies_data[data.frequency] +
    (data.join_bonus ?? 0) * bonus[bank];
  const salary = application1 + application2;
  const hem = Hem(
    bank,
    salary,
    `${data.numberOfApplicants == 0 ? "S" : "C"}${data.numberOfDependant}`
  );
  const taxes = textLevels(bank, salary);
  const MonthlyLoanRepayment = loanRepayments(
    bank,
    data.proposed_home_loans,
    data.loanTerm,
    data.loan_rate,
    data.is_newLoan ? 0.01 : 0.03
  );
  const surplus = NextSurplus(
    taxes.taxIncExclAdj,
    MonthlyLoanRepayment,
    hem < data.estimatedLivingExpense ? data.estimatedLivingExpense : hem,
    0,
    0
  );
  const maxLoan = calculateLoan(surplus, buffer + 1, data.loanTerm);

  return {
    taxes,
    hem,
    MonthlyLoanRepayment,
    surplus,
    maxLoan: maxLoan >= 0 ? maxLoan : 0,
    bonus: data.bonus * bonus[bank],
    join_bonus: (data.join_bonus ?? 0) * bonus[bank],
  };
};