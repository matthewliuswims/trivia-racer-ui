/**
 * @param {string} relativeUrl @example /v1/token/
 */
export const request = relativeUrl => {
  const headers = {
    "Content-Type": "application/json",
  }
  const token = sessionStorage.getItem("token")
  if (token) headers["Authorization"] = `Bearer ${token}`

  const url = `${process.env.GATSBY_API_HOST}${relativeUrl}`
  return fetch(url, {
    headers,
  })
}
