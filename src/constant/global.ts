export const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const gender = ["male", "female", "other"];

export const monthsOptions = Months.map((month) => ({
    label: month,
    value: month,
}));

export const bloodGroupOptions = bloodGroup.map((group) => ({
    label: group,
    value: group,
}));
export const genderOptions = gender.map((g) => ({
    label: g,
    value: g,
}));
