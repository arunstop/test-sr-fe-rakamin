export function validationIsEmail(value: string) {
  return !value.includes(" ") && value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
}

export function validationIsAlphaOnly(value: string) {
  return value.match(/^[a-zA-Z][\sa-zA-Z]*$/)
}

export function validationMoreThan(value: string, length: number) {
  return value.length > length
}

export function validationIsPassword(value: string) {
  return !value.includes(" ")
}
