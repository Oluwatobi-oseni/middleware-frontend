export type OtpAuthRespomse = {
  otpauth: string
  setupKey: string
}

export interface AxiosErrorResponse {
  message: string
  name: string
  stack?: string
  config: {
    transitional?: {
      silentJSONParsing: boolean
      forcedJSONParsing: boolean
      clarifyTimeoutError: boolean
    }
    adapter: string[]
    transformRequest: null[]
    transformResponse: null[]
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    env: Record<string, unknown>
    headers: Record<string, string>
    baseURL: string
    withCredentials: boolean
    method: string
    url: string
    data: string
  }
  code?: string
  status?: number
  response?: {
    data: {
      message?: string
      error?: string
      statusCode?: number
    }
    status: number
    statusText: string
    headers: Record<string, string>
    config: Record<string, unknown>
    request?: unknown
  }
}
