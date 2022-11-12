import { z } from 'zod'

const Pagination = z.object({
  cursor: z.string(),
})

type TPagination = z.infer<typeof Pagination>

type PaginatedData<DataType> = {
  data: DataType
  pagination: TPagination
}

export type { PaginatedData, TPagination }
export { Pagination }
