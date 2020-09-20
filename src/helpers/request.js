/**
 * @param {string} relativeUrl @example /v1/token/
 */
export const request = async ({ relativeUrl, needToken = true }) => {
  const headers = {
    "Content-Type": "application/json",
  }

  const url = `${process.env.GATSBY_API_HOST}${relativeUrl}`
  let token = sessionStorage.getItem("token")

  if (!token && needToken) {
    const response = await fetch(`${process.env.GATSBY_API_HOST}/v1/token/`, {
      headers,
    })
    const responseJSON = await response.json()
    token = responseJSON.token
    sessionStorage.setItem("token", token)
  }

  headers["Authorization"] = `Bearer ${token}`

  const response = await fetch(url, {
    headers,
  })

  if (!response.ok)
    throw Error(resp.statusText || resp.message || "There was a problem")
  const responseJSON = await response.json()
  return responseJSON
}
