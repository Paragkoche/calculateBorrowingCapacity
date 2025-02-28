import { useState } from "react";
import { calculateLoan } from "./utility/borrowing";
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
import { Hem, textLevels } from "./utility/hem_cal";
import { loanRepayments } from "./utility/loan_repayment";
import { NextSurplus } from "./utility/Net_Surplus";

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
                <TableHead>HEM</TableHead>
                <TableHead>Loan Repayment</TableHead>
                <TableHead>SURP</TableHead>
                <TableHead>DTI</TableHead>
                <TableHead>Net Income</TableHead>
              </TableHeader>
              <TableBody>
                {formData.rawSalary !== 0 ? (
                  [
                    {
                      bankName: "nab",
                      bankInterest: 5.75,
                      maxLoan: Math.max(
                        calculateLoan(
                          NextSurplus(
                            textLevels(formData.rawSalary, "Annual")
                              .taxIncExclAdj,
                            loanRepayments("nab", 500000, formData.loanTerm),
                            Hem("nab", formData.rawSalary, "S0") <
                              formData.estimatedLivingExpense
                              ? formData.estimatedLivingExpense
                              : Hem("nab", formData.rawSalary, "S0"),
                            0,
                            0
                          ),
                          5.75 + 1,
                          formData.loanTerm
                        ),
                        0
                      ).toFixed(2),
                      hem: Hem("nab", formData.rawSalary, "S0").toFixed(2),
                      loanRepayment: loanRepayments(
                        "nab",
                        500000,
                        formData.loanTerm
                      ).toFixed(2),
                      surp: NextSurplus(
                        textLevels(formData.rawSalary, "Annual").taxIncExclAdj,
                        loanRepayments("nab", 500000, formData.loanTerm),
                        Hem("nab", formData.rawSalary, "S0") <
                          formData.estimatedLivingExpense
                          ? formData.estimatedLivingExpense
                          : Hem("nab", formData.rawSalary, "S0"),
                        0,
                        0
                      ).toFixed(2),
                    },
                    {
                      bankName: "amp",
                      bankInterest: 6.5,
                      maxLoan: Math.max(
                        calculateLoan(
                          NextSurplus(
                            textLevels(formData.rawSalary, "Annual")
                              .taxIncExclAdj,
                            0,
                            Hem("amp", formData.rawSalary, "S0") <
                              formData.estimatedLivingExpense
                              ? formData.estimatedLivingExpense
                              : Hem("amp", formData.rawSalary, "S0"),
                            0,
                            0
                          ),
                          6.5 + 1,
                          formData.loanTerm
                        ),
                        0
                      ).toFixed(2),
                      hem: Hem("amp", formData.rawSalary, "S0").toFixed(2),
                      loanRepayment: loanRepayments(
                        "amp",
                        500000,
                        formData.loanTerm
                      ).toFixed(2),
                      surp: Math.round(
                        NextSurplus(
                          textLevels(formData.rawSalary, "Annual")
                            .taxIncExclAdj,
                          0,
                          Hem("amp", formData.rawSalary, "S0") <
                            formData.estimatedLivingExpense
                            ? formData.estimatedLivingExpense
                            : Hem("amp", formData.rawSalary, "S0"),
                          0,
                          0
                        )
                      ).toFixed(2),
                    },
                  ].map((v, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{v.bankName}</TableCell>

                      <TableCell>{v.maxLoan}</TableCell>
                      <TableCell>
                        {Math.floor(v.bankInterest * 100) / 100} %
                      </TableCell>
                      <TableCell>{v.hem}</TableCell>
                      <TableCell>{v.loanRepayment}</TableCell>
                      <TableCell>{v.surp}</TableCell>
                      <TableCell>
                        {(500000 / formData.rawSalary).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {Math.round(
                          textLevels(formData.rawSalary, "Annual")
                            .taxIncExclAdj / 12
                        ).toFixed(3)}
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
