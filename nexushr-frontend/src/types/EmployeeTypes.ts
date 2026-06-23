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