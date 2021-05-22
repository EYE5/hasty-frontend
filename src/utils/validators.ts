export const usernameRegex = new RegExp("^[0-9a-zA-Z" + ". \\-]+$");

export function username(value: string) {
  return usernameRegex.test(value);
}
