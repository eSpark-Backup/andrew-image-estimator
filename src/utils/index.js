export const usernameExtractfromEmail = (email) => {
    return email.match(/^([^@]+)/)[1];
}

export const Sorting = (options) => {
    return options?.sort((a, b) => a.value - b.value);
}
