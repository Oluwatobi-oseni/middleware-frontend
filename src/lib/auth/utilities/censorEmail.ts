// utils/censorEmail.ts
export function censorEmail(email: string): string {
  if (!email) return '********@******.com'

  const separateEmailInfoRegex = /(.+)(@.+\..+)/
  const match = email.match(separateEmailInfoRegex)

  if (!match) {
    return `********@******.com`
  }

  const emailName = match[1] // e.g (alex.olaolu007)
  const emailProvider = match[2] // e.g (@gmail.com)
  let censoredEmailName = ''

  if (emailName.length < 5) {
    // Censor all string if name is less than 5
    censoredEmailName = Array(emailName.length).fill('*').join('')
  } else {
    // censor every letter except the first 2 letters and the last letter
    const encryptMiddleContentRegex = /(.)(.)(.+)(.)/
    const replacer = (
      _: string,
      g1: string,
      g2: string,
      g3: string,
      g4: string
    ) => {
      const censor = (str: string) => str.replace(/./g, '*')
      return `${g1}${g2}${censor(g3)}${g4}`
    }

    censoredEmailName = emailName.replace(encryptMiddleContentRegex, replacer)
  }

  return `${censoredEmailName}${emailProvider}`
}
