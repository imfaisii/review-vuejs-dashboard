export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const getFirstNameFromName = (name: string): string | null => {
  if (name) {
    const firstName = name.split(' ')[0]
    return firstName
  }
  return null
}

export const getLastNameFromName = (name: string): string | null => {
  if (name) {
    const parts = name.split(' ')
    if (parts.length > 1) {
      const lastName = parts[parts.length - 1]
      return lastName
    }
  }
  return null
}

export function getQueryStringFromUrl(url: string) {
  const searchParams = new URLSearchParams(url.split('?')[1] || '')
  const params = Object.fromEntries(searchParams.entries())

  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

export const getLastSegment = (str: string) => {
  const segments = str.split('/')
  return segments[segments.length - 1]
}
