import fetch, { Response, RequestInfo } from "node-fetch"

export type ReturnType<T> = T | Promise<T>
export type NullOr<T> = T | null
export type CallbackType<ParsedAPIResponse> = {
  parsedAPIResponse: ParsedAPIResponse
  apiResponse: Response
}

type UrlOrFullRequest = string | ({ url: string } & RequestInit)

/**
 *
 * @param {string} url
 * @param {Promise<any> | any} callback - Can be used for data
 */

function easyFetch<CallbackResponse = null, ParsedAPIResponse = any>(
  url: UrlOrFullRequest
): NullOr<ReturnType<Response>>

function easyFetch<CallbackResponse = null, ParsedAPIResponse = any>(
  url: UrlOrFullRequest,
  callback: ({
    parsedAPIResponse,
    apiResponse
  }: CallbackType<ParsedAPIResponse>) => ReturnType<CallbackResponse>
): NullOr<ReturnType<CallbackResponse>>

async function easyFetch<CallbackResponse = null, ParsedAPIResponse = any>(
  url: UrlOrFullRequest,
  callback?: ({}: CallbackType<ParsedAPIResponse>) => ReturnType<
    CallbackResponse
  >
) {
  try {
    const apiResponse = await fetch(
      typeof url === "string" ? url : url.url,
      // @ts-ignore
      typeof url === "object" ? url : {}
    )

    if (!apiResponse || apiResponse.status !== 200) return null

    if (callback) {
      const parsedAPIResponse = await apiResponse.json()
      return callback({ parsedAPIResponse, apiResponse }) as ReturnType<
        CallbackResponse
      >
    }
    return apiResponse
  } catch (error) {
    console.error("@raddo/EasyFetch:", error)
    return null
  }
}

export default easyFetch
