export const paginateArray = (array: unknown[], perPage: number, page: number) =>
  array.slice((page - 1) * perPage, page * perPage)

// pagination meta
export const paginationMeta = computed(() => {
  return <T extends { current_page: number; per_page: number }>(options: T, total: number) => {
    const start = (options.current_page - 1) * options.per_page + 1
    const end = Math.min(options.current_page * options.per_page, total)

    return `Showing ${start} to ${end} of ${total} entries`
  }
})

export const genId = <T extends { id: number | string }>(array: T[]) => {
  const { length } = array

  let lastIndex = 0

  if (length) lastIndex = Number(array[length - 1]?.id) + 1

  return lastIndex || length + 1
}
