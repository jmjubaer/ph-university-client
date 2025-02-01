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
export interface TFaculty {
    _id: string;
    id: string;
    user: string;
    designation: string;
    name: Name;
    gender: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup: string;
    presentAddress: string;
    permanentAddress: string;
    profileImg: string;
    academicDepartment: AcademicDepartment;
    academicFaculty: AcademicFaculty;
    isDeleted: boolean;
    fullName: string;
}

export interface Name {
    firstName: string;
    middleName: string;
    lastName: string;
    _id: string;
}

export interface AcademicDepartment {
    _id: string;
    name: string;
    academicFaculty: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AcademicFaculty {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface TAdmin {
    _id: string;
    id: string;
    user: string;
    designation: string;
    name: Name;
    gender: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup: string;
    presentAddress: string;
    permanentAddress: string;
    profileImg: string;
    isDeleted: boolean;
    fullName: string;
}

export interface Name {
    firstName: string;
    middleName: string;
    lastName: string;
    _id: string;
}
