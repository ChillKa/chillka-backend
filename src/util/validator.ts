export const validateEmail = (email: string) => {
  const reg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return reg.test(email);
};

export const validatePassword = (password: string) => {
  // Minimum eight characters, at least a letter and a number
  const reg = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  return reg.test(password);
};
