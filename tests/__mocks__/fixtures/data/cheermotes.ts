import { cheermotesData } from './cheermotes-data'

let cheermotes = [...cheermotesData]

function getAll() {
  return cheermotes
}

function reset() {
  cheermotes = [...cheermotesData]
}

export { getAll, reset }
