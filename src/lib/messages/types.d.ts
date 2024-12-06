export type MessageResponse = {
  id: string
  category: string
  channel: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
}
export interface CreateMessageRequest {
  category: string
  channel: string
  title: string
  body: string
}

export interface CreateMessageResponse {
  success: boolean
  id: string
}
