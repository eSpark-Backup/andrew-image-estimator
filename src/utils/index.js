export const usernameExtractfromEmail = (email) => {
    return email.match(/^([^@]+)/)[1];
}