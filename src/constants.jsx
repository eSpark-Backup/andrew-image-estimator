import { DustbinIcon, EstimationsIcon, EstimationBlack, DustbinBlack, cropGIF, areaGIF, objectGIF, resetImgWhite, resetImg } from "./assets";

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
    {
        name: 'Change Fields',
        icon: resetImgWhite,
        path: '/change-fields',
        activeIcon: resetImg
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


export const transition = { type: "spring", duration: 0.8 };

export const slideAnimation = (direction) => {
    return {
        initial: {
            x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0,
            transition: { ...transition, delay: 0.5 },
        },
        animate: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: { ...transition, delay: 0 },
        },
        exit: {
            x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            transition: { ...transition, delay: 0 },
        },
    };
};

export const gridSlideAnimation = (index) => {
    const delay = index * 0.1; // Adjust the delay based on the index to stagger the animations

    return {
        initial: {
            x: -100,
            y: -100,
            opacity: 0,
            transition: { ...transition, delay: delay + 0.5 }, // Initial animation with delay
        },
        animate: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: { ...transition, delay }, // Animation to final position with delay
        },
        exit: {
            x: -100,
            y: -100,
            transition: { ...transition, delay }, // Exit animation with delay
        },
    };
};

export const fadeAnimation = {
    initial: {
        opacity: 0.01,
        transition: { ...transition, delay: 0.5 },
    },
    animate: {
        opacity: 1,
        transition: { ...transition, delay: 0 },
    },
    exit: {
        opacity: 0,
        transition: { ...transition, delay: 0 },
    },
};

export const gestureAnimation = {
    initial: {
        scale: 0.5,
        opacity: 0,
        transition: { type: "spring", stiffness: 400, damping: 17 },
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 400, damping: 17, delay: 1 },
    },
    exit: {
        scale: 0.5,
        opacity: 0,
        transition: { type: "spring", stiffness: 400, damping: 17 },
    },
}

export const inputAnimation = (type) => {
    return {
        initial: {
            width: 0,
            opacity: 0,
            transition: { type: "spring", stiffness: 400, damping: 17, delay: 1 },
        },
        animate: {
            width: type === "select" ? "350px" : "100%",
            opacity: 1,
            transition: { type: "spring", stiffness: 400, damping: 17, delay: 0.5 },
        },
        exit: {
            width: 0,
            opacity: 0,
            transition: { type: "spring", stiffness: 400, damping: 17, delay: 1 },
        },
    }
}

export const GIFModalStyle = {
    width: '450px',
    height: '350px',
    padding: '20px',
}