import { PMT } from "@/lib/excal";

// const Working_Servicing_Rate = 5.75;
// const HL_Servicing_Buffer = 0.03;
// const servicingRate = {
//   nab: {
//     rate1: Math.max(Working_Servicing_Rate / 100, 0 + HL_Servicing_Buffer),
//     rate2: Math.max(Working_Servicing_Rate / 100, 0 + HL_Servicing_Buffer),
//     rate3: Math.max(Working_Servicing_Rate / 100, 0 + HL_Servicing_Buffer),
//     rate4: Math.max(Working_Servicing_Rate / 100, 0 + HL_Servicing_Buffer),
//     rate5: Math.max(Working_Servicing_Rate / 100, 0 + HL_Servicing_Buffer),
//   },
//    amp: {
//     rate1: 0.0619,
//     rate2:  0.0619,
//     rate3:  0.0619,
//     rate4:  0.0619,
//     rate5:  0.0619,
//   },
// };

export const loanRepayments = (
  bank: string,
  loan_amount: number,
  loan_term: number,
  Working_Servicing_Rate: number,
  HL_Servicing_Buffer: number = 0.03,
  io_term = 0
) => {
  const servicingRate: {
    [key: string]: {
      [key: string]: number;
    };
  } = {
    nab: {
      rate1: Math.max(
        5.75 / 100,
        Working_Servicing_Rate / 100 + HL_Servicing_Buffer
      ),
      rate2: Math.max(5.75 / 100, Working_Servicing_Rate + HL_Servicing_Buffer),
      rate3: Math.max(5.75 / 100, Working_Servicing_Rate + HL_Servicing_Buffer),
      rate4: Math.max(5.75 / 100, Working_Servicing_Rate + HL_Servicing_Buffer),
      rate5: Math.max(5.75 / 100, Working_Servicing_Rate + HL_Servicing_Buffer),
    },
    amp: {
      rate1: Math.max(
        6.5 / 100,
        Working_Servicing_Rate / 100 + HL_Servicing_Buffer
      ),
      rate2: Working_Servicing_Rate,
      rate3: Working_Servicing_Rate,
      rate4: Working_Servicing_Rate,
      rate5: Working_Servicing_Rate,
    },
    westpac: {
      rate1: Math.max(
        5.05 / 100,
        Working_Servicing_Rate / 100 + HL_Servicing_Buffer
      ),
    },
    alex: {
      rate1: Math.max(
        6.5 / 100,
        Working_Servicing_Rate / 100 + HL_Servicing_Buffer
      ),
    },
    anz: {
      rate1: Math.max(
        6.5 / 100,
        Working_Servicing_Rate / 100 + HL_Servicing_Buffer
      ),
    },
    amb: {
      rate1: Math.max(
        6.5 / 100,
        Working_Servicing_Rate / 100 + HL_Servicing_Buffer
      ),
    },
  };
  console.table(servicingRate[bank]);

  // console.log(servicingRate);
  // console.log(loan_amount);

  try {
    return {
      data:
        PMT(
          servicingRate[bank].rate1 / 12,
          (loan_term - io_term) * 12,
          loan_amount
        ) * -1,
      rate: servicingRate[bank],
    };
  } catch (e) {
    return { data: 0, rate: servicingRate[bank] };
  }
};
