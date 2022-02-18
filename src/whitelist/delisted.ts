import delist from "./delist.json"

export const delistedSymbols = Object.keys(delist).join(", ")
export const isDelisted = (symbol: string) =>
  Object.keys(delist).includes(symbol)
