/**
 * @param {string} relativeUrl @example /v1/token/
 */
export const request = async relativeUrl => {
  const headers = {
    "Content-Type": "application/json",
  }

  const url = `${process.env.GATSBY_API_HOST}${relativeUrl}`
  let token = sessionStorage.getItem("token")

  if (!token) {
    const response = await fetch(`${process.env.GATSBY_API_HOST}/v1/token/`, {
      headers,
    })
    const responseJSON = await response.json()
    token = responseJSON.token
    sessionStorage.setItem("token", token)
  }

  headers["Authorization"] = `Bearer ${token}`

  return fetch(url, {
    headers,
  })
}
