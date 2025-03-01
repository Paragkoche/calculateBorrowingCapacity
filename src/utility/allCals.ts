import { calculateLoan } from "./borrowing";
import { Hem, textLevels } from "./hem_cal";
import { loanRepayments } from "./loan_repayment";
import { NextSurplus } from "./Net_Surplus";

type Frequency = "Weekly" | "Fortnightly" | "Monthly" | "Annual";

type formDataType = {
  numberOfApplicants: 1 | 0;
  numberOfDependant: number;
  loanTerm: number;
  incomeType: number;
  frequency: Frequency;
  rawSalary: number;
  otherIncome: number;
  loanRepayments: number;
  expenseFrequency: Frequency;
  estimatedLivingExpense: number;
  proposed_home_loans: number;
};
const frequencies_data: { [key in Frequency]: number } = {
  Annual: 1,
  Monthly: 12,
  Fortnightly: 26,
  Weekly: 52,
};
export const Cal= (bank:"nab" | "amp",data:formDataType,buffer:number)=>{
    const hem = Hem(bank,data.rawSalary * frequencies_data[data.frequency], `${data.numberOfApplicants == 0?"S":"C"}${data.numberOfDependant}`);
    const taxes = textLevels(data.rawSalary,data.frequency); 
    const MonthlyLoanRepayment = loanRepayments(bank,data.proposed_home_loans,data.loanTerm);
    const surplus = NextSurplus( taxes.taxIncExclAdj,MonthlyLoanRepayment,hem<data.estimatedLivingExpense ? data.estimatedLivingExpense : hem,0,0);
    const maxLoan = calculateLoan(surplus,buffer+1,data.loanTerm);

    return {
        taxes,
        hem,
        MonthlyLoanRepayment,
        surplus,
        maxLoan
    }

}