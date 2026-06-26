export interface EmployeeFormData {
     firstName: string;
     lastName: string;
     email: string;
     phone: string;

     gender: string;
     dateOfBirth: string;

     departmentId: string;
     designation: string;

     role: string;
     status: string;
     employmentType: string;

     joiningDate: string;
     probationEndDate?: string;
     confirmationDate?: string;

     emergencyContactName: string;
     emergencyContactNumber: string;

     compensation: {
          basicSalary: number;
          ctc: number;

          bankName: string;
          accountNumber: string;
          ifscCode: string;

          panNumber: string;
          uanNumber: string;
          pfNumber: string;
          esiNumber: string;
     };

     allowances: {
          allowanceName: string;
          amount: number;
          taxable: boolean;
     }[];

     deductions: {
          deductionName: string;
          amount: number;
     }[];
}


export interface EmployeeDetails {
     employee: Employee;
     compensation: {
          basicSalary: number;
          ctc: number;
          bankName: string;
          accountNumber: string;
          ifscCode: string;
          panNumber: string;
          uanNumber: string;
          pfNumber: string;
          esiNumber: string;
     };
     allowances: {
          allowanceName: string;
          amount: number;
          taxable: boolean;
     }[];
     deductions: {
          deductionName: string;
          amount: number;
     }[];
}


export interface Employee {
     id: number;
     employeeCode: string;
     firstName: string;
     lastName: string;
     email: string;
     phone: string;
     gender: string;
     dateOfBirth: string;
     emergencyContactName: string;
     emergencyContactNumber: string;
     designation: string;
     status: string;
     employmentType: string;
     role: string;
     joiningDate: string;
     probationEndDate: string;
     confirmationDate: string;
     offboardingDate?: string;
     departmentId: string;
     departmentName: string;
}