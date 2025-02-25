import { useState } from "react";
import { calculateBorrowingCapacity } from "./utility/borrowing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./components/mode-toggle";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

type Frequency = "Weekly" | "Fortnightly" | "Monthly" | "Annual";
const frequencies: Frequency[] = ["Weekly", "Fortnightly", "Monthly", "Annual"];
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
};
function App() {
  const [formData, setFormData] = useState<formDataType>({
    numberOfApplicants: 0,
    numberOfDependant: 0,
    loanTerm: 30,
    incomeType: 0,
    frequency: "Monthly" as Frequency,
    rawSalary: 0,
    otherIncome: 0,
    loanRepayments: 0,
    expenseFrequency: "Monthly" as Frequency,
    estimatedLivingExpense: 0,
  });

  return (
    <main className="p-6 justify-center w-full flex gap-6">
      <div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Borrowing Capacity Calculator
              </h2>
              <ModeToggle />
            </div>
          </CardHeader>
          <CardContent className="space-6 gap-5 p-6 flex ">
            <div className="gap-3 flex flex-col">
              <Label>Joint Application</Label>
              <RadioGroup
                value={formData.numberOfApplicants.toString()}
                onValueChange={(value) =>
                  setFormData((data) => ({
                    ...data,
                    numberOfApplicants: Number(value) == 0 ? 0 : 1,
                  }))
                }
              >
                <div className="flex gap-4">
                  <Label className="flex items-center gap-2">
                    <RadioGroupItem value="1" /> Yes
                  </Label>
                  <Label className="flex items-center gap-2">
                    <RadioGroupItem value="0" /> No
                  </Label>
                </div>
              </RadioGroup>

              <Label>No. of Dependants</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((data) => ({
                    ...data,
                    numberOfDependant: Number(value),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(7)].map((_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Separator />
              <h4 className="text-lg font-semibold">Loan Details</h4>

              <Label>Loan Term (years)</Label>
              <Input
                type="number"
                value={formData.loanTerm}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    loanTerm: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="gap-3 flex flex-col">
              <Separator />
              <h4 className="text-lg font-semibold">Income</h4>

              <Label>Income Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) =>
                  setFormData((data) => ({
                    ...data,
                    frequency: value as Frequency,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Gross Salary</Label>
              <Input
                type="number"
                value={formData.rawSalary}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    rawSalary: Number(e.target.value),
                  }))
                }
              />

              <Label>Other Income</Label>
              <Input
                type="number"
                value={formData.otherIncome}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    otherIncome: Number(e.target.value),
                  }))
                }
              />

              <Separator />
              <h4 className="text-lg font-semibold">Expenses</h4>

              <Label>Expense Frequency</Label>
              <Select
                value={formData.expenseFrequency}
                onValueChange={(value) =>
                  setFormData((data) => ({
                    ...data,
                    expenseFrequency: value as Frequency,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Living Expenses</Label>
              <Input
                type="number"
                value={formData.estimatedLivingExpense}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    estimatedLivingExpense: Number(e.target.value),
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-[80%]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <h4 className="text-lg font-semibold mt-4">Bank Loan Offers</h4>
            <Table className="border">
              <TableHeader>
                <TableHead>Sr</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Max Loan</TableHead>
                <TableHead>Interest Rate</TableHead>
              </TableHeader>
              <TableBody>
                {formData.rawSalary !== 0 ? (
                  [
                    {
                      bankName: "anz",
                      bankInterest: 6.1931279,
                      maxLoan: calculateBorrowingCapacity(
                        formData.numberOfApplicants,
                        formData.numberOfDependant,
                        6.1931279,
                        formData.loanTerm,
                        formData.incomeType,
                        formData.frequency,
                        formData.rawSalary,
                        formData.otherIncome,
                        formData.loanRepayments,
                        formData.expenseFrequency,
                        formData.estimatedLivingExpense
                      ).maxLoan,
                    },
                    {
                      bankName: "bendigo bank",
                      bankInterest: 6.2226,
                      maxLoan: calculateBorrowingCapacity(
                        formData.numberOfApplicants,
                        formData.numberOfDependant,
                        6.2226,
                        formData.loanTerm,
                        formData.incomeType,
                        formData.frequency,
                        formData.rawSalary,
                        formData.otherIncome,
                        formData.loanRepayments,
                        formData.expenseFrequency,
                        formData.estimatedLivingExpense
                      ).maxLoan,
                    },
                    {
                      bankName: "nab",
                      bankInterest: 6.231,
                      maxLoan: calculateBorrowingCapacity(
                        formData.numberOfApplicants,
                        formData.numberOfDependant,
                        6.231,
                        formData.loanTerm,
                        formData.incomeType,
                        formData.frequency,
                        formData.rawSalary,
                        formData.otherIncome,
                        formData.loanRepayments,
                        formData.expenseFrequency,
                        formData.estimatedLivingExpense
                      ).maxLoan,
                    },
                    {
                      bankName: "macquarie",
                      bankInterest: 6.19,
                      maxLoan: calculateBorrowingCapacity(
                        formData.numberOfApplicants,
                        formData.numberOfDependant,
                        6.19,
                        formData.loanTerm,
                        formData.incomeType,
                        formData.frequency,
                        formData.rawSalary,
                        formData.otherIncome,
                        formData.loanRepayments,
                        formData.expenseFrequency,
                        formData.estimatedLivingExpense
                      ).maxLoan,
                    },
                    {
                      bankName: "ING",
                      bankInterest: 6.1726,
                      maxLoan: calculateBorrowingCapacity(
                        formData.numberOfApplicants,
                        formData.numberOfDependant,
                        6.1726,
                        formData.loanTerm,
                        formData.incomeType,
                        formData.frequency,
                        formData.rawSalary,
                        formData.otherIncome,
                        formData.loanRepayments,
                        formData.expenseFrequency,
                        formData.estimatedLivingExpense
                      ).maxLoan,
                    },
                    // {
                    //   bankName: "athena",
                    //   bankInterest: 6.29,
                    //   maxLoan: calculateBorrowingCapacity(
                    //     formData.numberOfApplicants,
                    //     formData.numberOfDependant,
                    //     6.29,
                    //     formData.loanTerm,
                    //     formData.incomeType,
                    //     formData.frequency,
                    //     formData.rawSalary,
                    //     formData.otherIncome,
                    //     formData.loanRepayments,
                    //     formData.expenseFrequency,
                    //     formData.estimatedLivingExpense
                    //   ).maxLoan,
                    // },
                    // {
                    //   bankName: "liberty",
                    //   bankInterest: 7.29,
                    //   maxLoan: calculateBorrowingCapacity(
                    //     formData.numberOfApplicants,
                    //     formData.numberOfDependant,
                    //     7.29,
                    //     formData.loanTerm,
                    //     formData.incomeType,
                    //     formData.frequency,
                    //     formData.rawSalary,
                    //     formData.otherIncome,
                    //     formData.loanRepayments,
                    //     formData.expenseFrequency,
                    //     formData.estimatedLivingExpense
                    //   ).maxLoan,
                    // },
                    // {
                    //   bankName: "firstmac",
                    //   bankInterest: 6.49,
                    //   maxLoan: calculateBorrowingCapacity(
                    //     formData.numberOfApplicants,
                    //     formData.numberOfDependant,
                    //     6.49,
                    //     formData.loanTerm,
                    //     formData.incomeType,
                    //     formData.frequency,
                    //     formData.rawSalary,
                    //     formData.otherIncome,
                    //     formData.loanRepayments,
                    //     formData.expenseFrequency,
                    //     formData.estimatedLivingExpense
                    //   ).maxLoan,
                    // },
                    {
                      bankName: "westpac",
                      bankInterest: 6.22,
                      maxLoan: calculateBorrowingCapacity(
                        formData.numberOfApplicants,
                        formData.numberOfDependant,
                        6.22,
                        formData.loanTerm,
                        formData.incomeType,
                        formData.frequency,
                        formData.rawSalary,
                        formData.otherIncome,
                        formData.loanRepayments,
                        formData.expenseFrequency,
                        formData.estimatedLivingExpense
                      ).maxLoan,
                    },
                    // {
                    //   bankName: "st.george",
                    //   bankInterest: 6.24,
                    //   maxLoan: calculateBorrowingCapacity(
                    //     formData.numberOfApplicants,
                    //     formData.numberOfDependant,
                    //     6.2729,
                    //     formData.loanTerm,
                    //     formData.incomeType,
                    //     formData.frequency,
                    //     formData.rawSalary,
                    //     formData.otherIncome,
                    //     formData.loanRepayments,
                    //     formData.expenseFrequency,
                    //     formData.estimatedLivingExpense
                    //   ).maxLoan,
                    // },
                    // {
                    //   bankName: "AMP",
                    //   bankInterest: 6.24,
                    //   maxLoan: calculateBorrowingCapacity(
                    //     formData.numberOfApplicants,
                    //     formData.numberOfDependant,
                    //     6.2716,
                    //     formData.loanTerm,
                    //     formData.incomeType,
                    //     formData.frequency,
                    //     formData.rawSalary,
                    //     formData.otherIncome,
                    //     formData.loanRepayments,
                    //     formData.expenseFrequency,
                    //     formData.estimatedLivingExpense
                    //   ).maxLoan,
                    // },
                    // {
                    //   bankName: "AdelaideBank",
                    //   bankInterest: 6.24,
                    //   maxLoan: calculateBorrowingCapacity(
                    //     formData.numberOfApplicants,
                    //     formData.numberOfDependant,
                    //     6.2727,
                    //     formData.loanTerm,
                    //     formData.incomeType,
                    //     formData.frequency,
                    //     formData.rawSalary,
                    //     formData.otherIncome,
                    //     formData.loanRepayments,
                    //     formData.expenseFrequency,
                    //     formData.estimatedLivingExpense
                    //   ).maxLoan,
                    // },
                  ].map((v, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{v.bankName}</TableCell>

                      <TableCell>{v.maxLoan}</TableCell>
                      <TableCell>
                        {Math.floor(v.bankInterest * 100) / 100} %
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell colSpan={4}>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableCell>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default App;
