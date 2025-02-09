// ** React
import { ReactNode, useState } from "react";

// ** Context
import { DataStateContext } from "../dataStateContext";

// ** Types
import {
  IEmployee,
  IEmployeeBenefit,
  ISystemBenefit,
  ITypeJSON,
} from "@/const/types";

export const DataStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ITypeJSON>({
    employees: [],
    benefits: [],
  });
  const [countDuplicates, setCountDuplicates] = useState<string>('1');
  const [parsedData, setParsedData] = useState<string | null>(null);
  const [eIdSelectedEmployee, seteIdSelectedEmployee] = useState<number | null>(
    null
  );

  const handleSaveEmployee = (value: IEmployee) => {
    const employeeIndex = data.employees.findIndex(
      (emp) => emp.eId === value.eId
    );
    const updatedEmployees = [...data.employees];
    updatedEmployees[employeeIndex] = value;
    setData({ ...data, employees: updatedEmployees });
  };

  const handleSaveBenefit = (value: ISystemBenefit) => {
    setData((prevData) => {
      const benefitIndex = prevData.benefits.findIndex(
        (ben) => ben.id === value.id
      );
      const updatedBenefits = [...prevData.benefits];

      if (benefitIndex !== -1) {
        updatedBenefits[benefitIndex] = value;
      } else {
        updatedBenefits.push(value);
      }
      return {
        ...prevData,
        benefits: updatedBenefits,
      };
    });
  };

  const handleSaveData = <
    T extends Partial<{
      id: string | number;
      eId: number;
      customBambooTableRowId: number | string;
    }>
  >(
    value: T,
    type:
      | "employeeBenefit"
      | "depositAccount"
      | "bonuses"
      | "personal"
      | "jobInfo"
      | "salary"
      | "status"
      | "reimbursements"
      | "otherDeductions"
  ) => {
    const checkArray = <Field extends keyof IEmployee>(
      arrayField: Field,
      employee: IEmployee
    ): IEmployee[Field] => {
      const fieldArray = employee[arrayField] as IEmployee[Field];

      if (!Array.isArray(fieldArray)) {
        throw new Error(`Expected an array for field: ${String(arrayField)}`);
      }
      const normalizedValueId = Number(value.customBambooTableRowId);

      const updatedArray = fieldArray.map((item) => {
        if (
          type === "employeeBenefit" &&
          (item as IEmployeeBenefit).id === value.id
        ) {
          return { ...item, ...value };
        }

        if (
          type !== "employeeBenefit" &&
          Number(
            (item as { customBambooTableRowId: number }).customBambooTableRowId
          ) === normalizedValueId
        ) {
          return { ...item, ...value };
        }
        return item;
      });

      const itemExists = updatedArray.some((item) =>
        type === "employeeBenefit"
          ? (item as IEmployeeBenefit).id === value.id
          : Number(
              (item as { customBambooTableRowId: number })
                .customBambooTableRowId
            ) === normalizedValueId
      );

      if (!itemExists) {
        updatedArray.push(value as (typeof fieldArray)[number]);
      }
      return updatedArray as IEmployee[Field];
    };

    setData((prevData) => ({
      ...prevData,
      employees: prevData.employees.map((employee) => {
        if (employee.eId !== eIdSelectedEmployee) return employee;

        switch (type) {
          case "jobInfo":
            return {
              ...employee,
              jobInfo: checkArray("jobInfo", employee),
            };
          case "salary":
            return {
              ...employee,
              salary: checkArray("salary", employee),
            };
          case "status":
            return {
              ...employee,
              employmentStatus: checkArray("employmentStatus", employee),
            };
          case "personal":
            return { ...employee, ...value };
          case "employeeBenefit":
            return {
              ...employee,
              benefits: checkArray("benefits", employee),
            };
          case "bonuses":
            return {
              ...employee,
              bonuses: checkArray("bonuses", employee),
            };
          case "depositAccount":
            return {
              ...employee,
              depositAccounts: checkArray("depositAccounts", employee),
            };
          case "reimbursements":
            return {
              ...employee,
              reimbursements: checkArray("reimbursements", employee),
            };
          case "otherDeductions":
            return {
              ...employee,
              otherDeductions: checkArray("otherDeductions", employee),
            };
          default:
            return employee;
        }
      }),
    }));
  };

  const hasData = !!(data?.benefits?.length || data?.employees?.length);

  return (
    <DataStateContext.Provider
      value={{
        data,
        setData,
        countDuplicates,
        setCountDuplicates,
        parsedData,
        eIdSelectedEmployee,
        seteIdSelectedEmployee,
        setParsedData,
        handleSaveEmployee,
        handleSaveBenefit,
        handleSaveData,
        hasData,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};
