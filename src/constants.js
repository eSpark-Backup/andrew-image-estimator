import { DustbinIcon, EstimationsIcon, EstimationBlack, DustbinBlack } from "./assets";

export const menuList = [
    {
        name: 'Estimations',
        icon: EstimationsIcon,
        path: '/',
        activeIcon: EstimationBlack
    },
    {
        name: 'Trash',
        icon: DustbinIcon,
        path: '/trash',
        activeIcon: DustbinBlack
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


export const estimatorListData = [
    {
        id: 1,
        name: 'My friend card 1',
        createdAt: '26 September,23'
    },
    {
        id: 2,
        name: 'My friend card 2',
        createdAt: '19 September,23'
    },
    {
        id: 3,
        name: 'My friend card 3',
        createdAt: '18 September,23'
    },
    {
        id: 4,
        name: 'My friend card 4',
        createdAt: '12 September,23'
    },
    {
        id: 5,
        name: 'My friend card 5',
        createdAt: '12 September,23'
    },
    {
        id: 6,
        name: 'My friend card 6',
        createdAt: '12 September,23'
    },
    {
        id: 7,
        name: 'My friend card 7',
        createdAt: '12 September,23'
    },
]

export const SelectorTour = [
    {
        content: 'You can select the unit for measurement',
        placement: 'bottom',
        styles: {
            options: {
                width: 300,
                height: 200,
                // hide close button 

            },
        },
        target: '.select-taker',
        disableBeacon: true
    },
]

export const heightTour = [
    {
        content: 'Select the height of object to proceed',
        placement: 'bottom',
        styles: {
            options: {
                width: 300,
                height: 200,
            },
        },
        target: '.height-taker',
        disableBeacon: true
    },
]

export const widthTour = [
    {
        content: 'Select the length of object to proceed',
        placement: 'bottom',
        styles: {
            options: {
                width: 300,
                height: 200,
            },
        },
        target: '.width-taker',
        disableBeacon: true
    },
]

export const SelectImageTour = [
    {
        content: 'You can change your selected image',
        placement: 'right',
        styles: {
            options: {
                width: 300,
                height: 200,
            },
        },
        target: '.select-image',
        disableBeacon: true
    },
]

export const ImageTour = [
    {
        content: 'select your image from here',
        placement: 'bottom',
        styles: {
            options: {
                width: 300,
                height: 200,
            },
        },
        target: '.image-selector',
        disableBeacon: true
    },
]