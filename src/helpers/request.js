/**
 * @param {string} relativeUrl @example /v1/token/
 */
export const request = async ({
  relativeUrl,
  needToken = true,
  options = {},
}) => {
  const headers = {
    "Content-Type": "application/json",
  }

  const url = `${process.env.GATSBY_API_HOST}${relativeUrl}`
  let token = sessionStorage.getItem("token")

  if (!token && needToken) {
    token = await setNewToken()
  }

  headers["Authorization"] = `Bearer ${token}`

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok)
    throw Error(resp.statusText || resp.message || "There was a problem")
  const responseJSON = await response.json()
  return responseJSON
}

export const setNewToken = async () => {
  const response = await fetch(`${process.env.GATSBY_API_HOST}/v1/token/`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const responseJSON = await response.json()
  const token = responseJSON.token
  sessionStorage.setItem("token", token)
  return token
}
