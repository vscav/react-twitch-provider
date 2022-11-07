import { z } from 'zod'

const Pagination = z.object({
  cursor: z.string(),
})

type Pagination = z.infer<typeof Pagination>

type PaginatedData<DataType> = {
  data: DataType
  pagination: Pagination
}

export type { PaginatedData, Pagination }
