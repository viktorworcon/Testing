/**
 * Splits email into array of strings (username, domain)
 * @param email The email that is gonna be split by delimiter "@"
 * @returns Array of strings [username, domain]
 */
export const splitEmail = (email: string): string[] => {
  if (!validateEmail(email)) {
    throw "Incorrect format of email";
  }
  // This regex return two strings separated by delimiter "@" and will keep delimiter in start of the second string
  return email.split(/(?=[@])/g);
};

/**
 * Checks the email is it in the correct format
 * @param email The email that is gonna be tested
 * @returns True or false depends is the email in correct format
 */
export const validateEmail = (email: string): boolean => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
