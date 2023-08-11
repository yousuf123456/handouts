

export const validateEmail = (email : string | null | undefined) => {
    if(!email) return true
    
    const regex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
};