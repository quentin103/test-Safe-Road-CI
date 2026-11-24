/** Indicatif de la Côte d'Ivoire. */
export const IVORIAN_DIAL_CODE = "+225"

/** Ne garde que les 10 chiffres nationaux (retire l'indicatif s'il a été collé). */
export function normalizeIvorianNumber(input: string) {
  return input.replace(/\D/g, "").replace(/^225(?=\d{10}$)/, "").slice(0, 10)
}

/** « 0748216305 » → « 07 48 21 63 05 ». */
export function formatIvorianNumber(digits: string) {
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ")
}

/** « 0748216305 » → « +225 07 48 21 63 05 ». */
export function formatInternationalNumber(digits: string) {
  return `${IVORIAN_DIAL_CODE} ${formatIvorianNumber(digits)}`
}

export function isValidIvorianNumber(digits: string) {
  return /^\d{10}$/.test(digits)
}

/** Quatre derniers chiffres, seule partie du numéro affichée hors de la liste des invitations : « …63 05 ». */
export function formatPhoneSuffix(digits: string) {
  return `…${formatIvorianNumber(digits.slice(-4))}`
}
