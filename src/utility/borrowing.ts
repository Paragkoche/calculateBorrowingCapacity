// import { getLivingExpenseTable } from "./LivingExp";
// import { calculatePayment } from "./RepaymentCal";

// const formatter = new Intl.NumberFormat("en-AU", {
//   style: "currency",
//   currency: "AUD",
// });
// type frequency = "Weekly" | "Fortnightly" | "Monthly" | "Annual";

// const adjustSalary = (
//   frequency: number,
//   currentIncomeType: string,
//   incomeType: string,
//   amount: number = 0
// ) => {
//   const annualSalary = amount * frequency;
//   if (currentIncomeType == incomeType) return annualSalary;
//   return incomeType == "gross"
//     ? calculateGrossSalary(annualSalary)
//     : calculateNetSalary(annualSalary);
// };

// const calculateGrossSalary = (netSalary: number) => {
//   const taxBrackets = [
//     {
//       incomeThreshold: 134562,
//       baseSalary: 190000,
//       rate: 0.45,
//       offset: 51638,
//     },
//     {
//       incomeThreshold: 101012,
//       baseSalary: 135000,
//       rate: 0.37,
//       offset: 31288,
//     },
//     { incomeThreshold: 40137, baseSalary: 45000, rate: 0.3, offset: 4288 },
//     { incomeThreshold: 18200, baseSalary: 18200, rate: 0.16, offset: 0 },
//     { incomeThreshold: 0, baseSalary: 0, rate: 0, offset: 0 },
//   ];

//   const { baseSalary, rate, offset } =
//     taxBrackets.find((bracket) => netSalary > bracket.incomeThreshold) ??
//     taxBrackets[taxBrackets.length - 1];

//   let medicareRate;
//   let medicateOffset = 0;
//   if (netSalary <= 25452) {
//     //26000
//     medicareRate = 0;
//   } else if (netSalary <= 30262) {
//     //32500
//     medicateOffset = 26000;
//     medicareRate = 0.1;
//   } else {
//     medicareRate = 0.02;
//   }

//   const taxCalc =
//     netSalary + offset - baseSalary * rate - medicateOffset * medicareRate;
//   const grossSalary = Math.round(taxCalc / (1 - medicareRate - rate));
//   return grossSalary;
// };

// const calculateNetSalary = (salary: number) => {
//   const taxBrackets = [
//     { baseSalary: 190000, rate: 0.45, offset: 51638 },
//     { baseSalary: 135000, rate: 0.37, offset: 31288 },
//     { baseSalary: 45000, rate: 0.3, offset: 4288 },
//     { baseSalary: 18200, rate: 0.16, offset: 0 },
//     { baseSalary: 0, rate: 0, offset: 0 },
//   ];

//   const { baseSalary, rate, offset } =
//     taxBrackets.find((bracket) => salary > bracket.baseSalary) ??
//     taxBrackets[taxBrackets.length - 1];

//   let medicareLevy;
//   if (salary <= 26000) {
//     medicareLevy = 0;
//   } else if (salary <= 32500) {
//     medicareLevy = (salary - 26000) * 0.1;
//   } else {
//     medicareLevy = salary * 0.02;
//   }

//   const tax = offset + (salary - baseSalary) * rate + medicareLevy;
//   const netSalary = salary - tax;
//   return Math.round(netSalary);
// };

// const calculateTaxableIncome = (
//   incomes: {
//     [key in string]: {
//       type: string;
//       frequency: frequency;
//       amount: number;
//     };
//   },
//   currentIncomeType: "net" | "gross",
//   incomeType: "net" | "gross"
// ) => {
//   const frequencyMap = {
//     Annual: 1,
//     Monthly: 12,
//     Fortnightly: 26,
//     Weekly: 52,
//   };
//   const convertToAnnually = frequencyMap[incomes.salary?.frequency] || 1;
//   const salary = adjustSalary(
//     convertToAnnually,
//     currentIncomeType,
//     incomeType,
//     incomes.salary.amount
//   );
//   const partnerSalary = adjustSalary(
//     convertToAnnually,
//     currentIncomeType,
//     incomeType,
//     (incomes.partnerSalary && incomes.partnerSalary.amount) ?? 0
//   );
//   return salary + partnerSalary;
// };

// const calculateExpenses = (
//   expenses: {
//     frequency: frequency;
//     type?: string;
//     amount: number;
//     creditLimit?: number;
//   }[]
// ) => {
//   let totalExpenses = 0;
//   let converToMonthly = 12;
//   const creditCardLimitRatio = 2.5;

//   for (let item of expenses) {
//     switch (item.frequency) {
//       case "Annual":
//         converToMonthly = 12;
//         break;
//       case "Monthly":
//         converToMonthly = 1;
//         break;
//       case "Fortnightly":
//         converToMonthly = 12 / 26;
//         break;
//       case "Weekly":
//         converToMonthly = 12 / 52;
//         break;
//     }
//     if (item.type === "Credit Card") {
//       totalExpenses += (item.creditLimit ?? 0) * (creditCardLimitRatio / 100);
//     } else {
//       totalExpenses += item.amount / converToMonthly;
//     }
//   }

//   return totalExpenses;
// };

// const calculateLoan = (
//   payment: number,
//   interestRate: number,
//   term: number,
//   paymentFrequency: number
// ) => {
//   let denominator;
//   let interestRatePerPeriod;
//   let numberOfPayments;
//   const WEEKLY = 52;
//   const FORTNIGHTLY = 26;
//   const MONTHLY = 12;
//   switch (paymentFrequency) {
//     case WEEKLY:
//       interestRatePerPeriod = interestRate / WEEKLY;
//       numberOfPayments = term * WEEKLY;
//       break;
//     case FORTNIGHTLY:
//       interestRatePerPeriod = interestRate / FORTNIGHTLY;
//       numberOfPayments = term * FORTNIGHTLY;
//       break;
//     default:
//       interestRatePerPeriod = interestRate / MONTHLY;
//       numberOfPayments = term * MONTHLY;
//   }
//   interestRatePerPeriod /= 100;
//   denominator = 1 - Math.pow(1 + interestRatePerPeriod, -1 * numberOfPayments);

//   return (payment * denominator) / interestRatePerPeriod;
// };

// export const calculateBorrowingCapacity = (
//   numberOfApplicants: 1 | 0,
//   numberOfDependant: number,
//   interestRate: number,
//   loanTerm: number,
//   incomeType: number,
//   frequency: frequency,
//   rawSalary: number,
//   otherIncome: number,
//   loanRepayments: number,
//   expenseFrequency: frequency,
//   estimatedLivingExpense: number,
//   _ccLimit: number = 0
// ) => {
//   const salary = rawSalary;
//   const expenses: {
//     frequency: frequency;
//     type?: string;
//     amount: number;
//     creditLimit?: number;
//   }[] = [];
//   const incomes: {
//     [key in string]: {
//       type: string;
//       frequency: frequency;
//       amount: number;
//     };
//   } = {};
//   incomes.salary = {
//     type: "Salary",
//     frequency,
//     amount: salary + otherIncome,
//   };
//   expenses[0] = {
//     frequency: expenseFrequency,
//     type: "",
//     creditLimit: undefined,
//     amount: loanRepayments,
//   };
//   expenses[1] = {
//     frequency: expenseFrequency,
//     type: "Credit Card",
//     creditLimit: undefined,
//     amount: 0,
//   };
//   const currentIncomeType = incomeType === 1 ? "net" : "gross";
//   const totalIncome = calculateTaxableIncome(
//     incomes,
//     currentIncomeType,
//     "gross"
//   );
//   const totalNetIncome = calculateTaxableIncome(
//     incomes,
//     currentIncomeType,
//     "net"
//   );
//   const totalExpenses = calculateExpenses(expenses);
//   const ceilingIncomeLow = 328001;
//   const livingExpense = getLivingExpenseTable().find((item) => {
//     if (
//       item.adults === numberOfApplicants + 1 &&
//       item.dependants === numberOfDependant &&
//       item.incomeLow <= totalIncome &&
//       item.incomeHigh >= totalIncome
//     ) {
//       return true;
//     }

//     if (
//       item.adults === numberOfApplicants + 1 &&
//       item.dependants === numberOfDependant &&
//       totalIncome >= ceilingIncomeLow &&
//       item.incomeLow === ceilingIncomeLow
//     ) {
//       return true;
//     }
//     return false;
//   })?.expense as number;

//   const maxLivingExpenses =
//     estimatedLivingExpense && estimatedLivingExpense > livingExpense
//       ? estimatedLivingExpense
//       : livingExpense;

//   const surplusMonthlyIncome =
//     totalNetIncome / 12 - totalExpenses - maxLivingExpenses;

//   const servicingTerm = loanTerm;

//   let maxLoanAmount = calculateLoan(
//     surplusMonthlyIncome,
//     interestRate + 3,
//     servicingTerm,
//     0
//   );
//   if (maxLoanAmount < 0) {
//     maxLoanAmount = 0;
//   }
//   if (interestRate == 0) {
//     interestRate = interestRate + 3;
//   }

//   const repaymentAmount = calculatePayment(
//     maxLoanAmount,
//     interestRate,
//     servicingTerm,
//     "Monthly" as frequency,
//     false
//   );

//   return {
//     hem: formatter.format(livingExpense),
//     maxLoan: formatter.format(maxLoanAmount),
//     surplusMonthlyIncome: formatter.format(surplusMonthlyIncome),
//     repaymentAmount,
//   };
// };

import { getLivingExpenseTable } from "./LivingExp";
import { calculatePayment } from "./RepaymentCal";

export const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

type Frequency = "Weekly" | "Fortnightly" | "Monthly" | "Annual";

const frequencyMap = {
  Annual: 1,
  Monthly: 12,
  Fortnightly: 26,
  Weekly: 52,
};

const adjustSalary = (
  frequency: number,
  currentIncomeType: "net" | "gross",
  incomeType: "net" | "gross",
  amount: number = 0
) => {
  const annualSalary = amount * frequency;
  if (currentIncomeType === incomeType) return annualSalary;
  return incomeType === "gross"
    ? calculateGrossSalary(annualSalary)
    : calculateNetSalary(annualSalary);
};

const calculateGrossSalary = (netSalary: number) => {
  const taxBrackets = [
    { incomeThreshold: 134562, baseSalary: 190000, rate: 0.45, offset: 51638 },
    { incomeThreshold: 101012, baseSalary: 135000, rate: 0.37, offset: 31288 },
    { incomeThreshold: 40137, baseSalary: 45000, rate: 0.3, offset: 4288 },
    { incomeThreshold: 18200, baseSalary: 18200, rate: 0.16, offset: 0 },
    { incomeThreshold: 0, baseSalary: 0, rate: 0, offset: 0 },
  ];

  const { baseSalary, rate, offset } =
    taxBrackets.find((bracket) => netSalary > bracket.incomeThreshold) ??
    taxBrackets[taxBrackets.length - 1];

  const medicareRate = netSalary <= 25452 ? 0 : netSalary <= 30262 ? 0.1 : 0.02;
  const medicareOffset = netSalary <= 30262 && netSalary > 25452 ? 26000 : 0;

  return Math.round(
    (netSalary + offset - baseSalary * rate - medicareOffset * medicareRate) /
      (1 - medicareRate - rate)
  );
};

const calculateNetSalary = (salary: number) => {
  const taxBrackets = [
    { baseSalary: 190000, rate: 0.45, offset: 51638 },
    { baseSalary: 135000, rate: 0.37, offset: 31288 },
    { baseSalary: 45000, rate: 0.3, offset: 4288 },
    { baseSalary: 18200, rate: 0.16, offset: 0 },
    { baseSalary: 0, rate: 0, offset: 0 },
  ];

  const { baseSalary, rate, offset } =
    taxBrackets.find((bracket) => salary > bracket.baseSalary) ??
    taxBrackets[taxBrackets.length - 1];

  const medicareLevy =
    salary <= 26000
      ? 0
      : salary <= 32500
      ? (salary - 26000) * 0.1
      : salary * 0.02;
  return Math.round(
    salary - (offset + (salary - baseSalary) * rate + medicareLevy)
  );
};

const calculateTaxableIncome = (
  incomes: Record<
    string,
    { type: string; frequency: Frequency; amount: number }
  >,
  currentIncomeType: "net" | "gross",
  incomeType: "net" | "gross"
) => {
  return Object.values(incomes).reduce((total, income) => {
    return (
      total +
      adjustSalary(
        frequencyMap[income.frequency],
        currentIncomeType,
        incomeType,
        income.amount
      )
    );
  }, 0);
};

const calculateExpenses = (
  expenses: {
    frequency: Frequency;
    type?: string;
    amount: number;
    creditLimit?: number;
  }[]
) => {
  return expenses.reduce((total, item) => {
    const convertToMonthly = frequencyMap[item.frequency] / 12;
    return (
      total +
      (item.type === "Credit Card"
        ? (item.creditLimit ?? 0) * 0.025
        : item.amount / convertToMonthly)
    );
  }, 0);
};

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

export const calculateBorrowingCapacity = (
  numberOfApplicants: 1 | 0,
  numberOfDependants: number,
  interestRate: number,
  loanTerm: number,
  incomeType: number,
  frequency: Frequency,
  rawSalary: number,
  otherIncome: number,
  loanRepayments: number,
  expenseFrequency: Frequency,
  estimatedLivingExpense: number,
  _ccLimit: number = 0
) => {
  const incomes = {
    salary: { type: "Salary", frequency, amount: rawSalary + otherIncome },
  };
  const expenses = [{ frequency: expenseFrequency, amount: loanRepayments }];

  const totalIncome = calculateTaxableIncome(
    incomes,
    incomeType === 1 ? "net" : "gross",
    "gross"
  );
  const totalNetIncome = calculateTaxableIncome(
    incomes,
    incomeType === 1 ? "net" : "gross",
    "net"
  );
  const totalExpenses = calculateExpenses(expenses);

  const livingExpense =
    getLivingExpenseTable().find(
      (item) =>
        item.adults === numberOfApplicants + 1 &&
        item.dependants === numberOfDependants &&
        item.incomeLow <= totalIncome &&
        item.incomeHigh >= totalIncome
    )?.expense ?? 0;

  const surplusMonthlyIncome =
    totalNetIncome / 12 -
    totalExpenses -
    Math.max(livingExpense, estimatedLivingExpense);
  const maxLoanAmount = Math.max(
    calculateLoan(surplusMonthlyIncome, interestRate + 3, loanTerm),
    0
  );
  const repaymentAmount = calculatePayment(
    maxLoanAmount,
    interestRate,
    loanTerm,
    "Monthly",
    false
  );

  return {
    hem: formatter.format(livingExpense),
    maxLoan: formatter.format(maxLoanAmount),
    surplusMonthlyIncome: formatter.format(surplusMonthlyIncome),
    repaymentAmount,
  };
};
