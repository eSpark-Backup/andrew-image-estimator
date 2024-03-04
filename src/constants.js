import { DustbinIcon, EstimationsIcon } from "./assets";

export const menuList = [
    {
        name: 'Estimations',
        icon: EstimationsIcon,
        path: '/'
    },
    {
        name: 'Trash',
        icon: DustbinIcon,
        path: '/trash'
    },
]


export const signupItems = [
    {
        label: "First name:",
        name: "fName",
        placeholder: "Enter firstname",
        type: "text"
    },
    {
        label: "Last name:",
        name: "lName",
        placeholder: "Enter lastname",
        type: "text"
    },
    {
        label: "Email:",
        name: "email",
        placeholder: "Enter email",
        type: "email"
    },
    {
        label: "Password",
        name: "password",
        placeholder: "Enter password",
        type: "password"
    },
    {
        label: "Confirm password:",
        name: "confirmPassword",
        placeholder: "Confirm password",
        type: "password"
    },
]

export const signinItems = [
    {
        label: "Email:",
        name: "email",
        placeholder: "Enter email",
        type: "email"
    },
    {
        label: "Password",
        name: "password",
        placeholder: "Enter password",
        type: "password"
    },
]
