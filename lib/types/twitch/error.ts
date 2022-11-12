import { z } from 'zod'

const TwitchApiError = z.object({
  error: z.string(),
  message: z.string(),
  status: z.number(),
})

type TwitchApiError = z.infer<typeof TwitchApiError>

export { TwitchApiError }
