export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type TStudent = {
    _id: string;
    id: string;
    password: string;
    name: TUserName;
    fullName: string;
    gender: "male" | "female" | "other";
    dateOfBirth?: Date;
    email: string;
    user: {
        _id: string;
        role: "student";
        status: "blocked" | "in-progress";
    };
    admissionSemester: string;
    academicDepartment: string;
    academicFaculty: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string;
    isDeleted: boolean;
};
