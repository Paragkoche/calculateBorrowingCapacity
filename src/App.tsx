import { useState } from "react";

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
import { ModeToggle } from "./components/mode-toggle";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

import { Cal } from "./utility/allCals";
import { Separator } from "./components/ui/separator";
import { useTheme } from "./components/theme-provider";
import { formatter } from "./lib/fomatter";

type Frequency = "Weekly" | "Fortnightly" | "Monthly" | "Annual";
const frequencies: Frequency[] = ["Weekly", "Fortnightly", "Monthly", "Annual"];
const frequencies_data: { [key in Frequency]: number } = {
  Annual: 1,
  Monthly: 12,
  Fortnightly: 26,
  Weekly: 52,
};
type formDataType = {
  numberOfApplicants: 1 | 0;
  numberOfDependant: number;
  loanTerm: number;
  incomeType: number;
  frequency: Frequency;
  rawSalary: number;
  loanRepayments: number;
  expenseFrequency: Frequency;
  estimatedLivingExpense: number;
  proposed_home_loans: number;
  join_rawSalary?: number;
  bonus: number;
  join_bonus?: number;
  is_newLoan: boolean;
  loan_rate: number;
};

function App() {
  const [formData, setFormData] = useState<formDataType>({
    numberOfApplicants: 0,
    numberOfDependant: 0,
    loanTerm: 30,
    incomeType: 0,
    frequency: "Monthly" as Frequency,
    rawSalary: 0,
    loanRepayments: 0,
    expenseFrequency: "Monthly" as Frequency,
    estimatedLivingExpense: 0,
    proposed_home_loans: 0,
    join_rawSalary: 0,
    bonus: 0,
    is_newLoan: true,
    loan_rate: 0,
  });
  const theme = useTheme();

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
                    join_rawSalary:
                      Number(value) == 0 ? 0 : data.join_rawSalary,
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
              <Label>
                Is this application eligible for Alternative Refinance
                Assessment?
              </Label>
              <RadioGroup
                value={formData.is_newLoan ? "1" : "0"}
                onValueChange={(value) =>
                  setFormData((data) => ({
                    ...data,
                    is_newLoan: value == "1" ? true : false,
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
                  {[...Array(10)].map((_, i) => (
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
              <Label>Proposed home loans</Label>
              <Input
                type="number"
                value={formData.proposed_home_loans}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    proposed_home_loans: Number(e.target.value),
                  }))
                }
              />
              <Label>Rant</Label>
              <Input
                type="number"
                value={formData.loan_rate}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    loan_rate: Number(e.target.value),
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
              <Label>bonus (YTD)</Label>
              <Input
                type="number"
                value={formData.bonus}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    bonus: Number(e.target.value),
                  }))
                }
              />

              {formData.numberOfApplicants == 1 && (
                <>
                  <Label>Gross Salary (Join Application)</Label>
                  <Input
                    type="number"
                    value={formData.join_rawSalary}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        join_rawSalary: Number(e.target.value),
                      }))
                    }
                  />
                  <Label>bonus (YTD)</Label>
                  <Input
                    type="number"
                    value={formData.join_bonus}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        join_bonus: Number(e.target.value),
                      }))
                    }
                  />
                </>
              )}

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
                <TableHead>HEM</TableHead>
                <TableHead>Loan Repayment</TableHead>
                <TableHead>SURP</TableHead>
                <TableHead>DTI</TableHead>
                <TableHead>Net Income</TableHead>
                {/* <TableHead>bonus</TableHead>
                <TableHead>bonus join</TableHead> */}
              </TableHeader>
              <TableBody>
                {formData.rawSalary !== 0 ? (
                  [
                    {
                      bankName: "nab",
                      bankInterest: 6.19,
                      data: Cal("nab", formData, 6.19),
                    },
                    {
                      bankName: "amp",
                      bankInterest: 6.74,
                      data: Cal("amp", formData, 6.74),
                    },
                    {
                      bankName: "westpac",
                      bankInterest: 6.22,
                      data: Cal("westpac", formData, 6.22),
                    },
                  ].map((v, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <img
                          src={`/${v.bankName}${
                            theme.theme == "dark" || theme.theme == "system"
                              ? "-white"
                              : ""
                          }.png`}
                          className="h-[24px]"
                        />
                      </TableCell>

                      <TableCell>{formatter.format(v.data.maxLoan)}</TableCell>
                      <TableCell>
                        {Math.floor(v.bankInterest * 100) / 100} %
                      </TableCell>
                      <TableCell>{formatter.format(v.data.hem)}</TableCell>
                      <TableCell>
                        {formatter.format(v.data.MonthlyLoanRepayment)}
                      </TableCell>
                      <TableCell>{formatter.format(v.data.surplus)}</TableCell>
                      <TableCell>
                        {(
                          formData.proposed_home_loans /
                          (formData.rawSalary *
                            frequencies_data[formData.frequency])
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {formatter.format(v.data.taxes.taxIncExclAdj / 12)}
                      </TableCell>
                      {/* <TableCell>{formatter.format(v.data.bonus)}</TableCell>
                      <TableCell>
                        {formatter.format(v.data.join_bonus)}
                      </TableCell> */}
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
