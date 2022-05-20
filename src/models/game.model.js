export function showNumK(num) {
  if (num >= 10000) {
    num = (num / 1000).toFixed(1) + 'k'
  }
  return num
}

export const GAME_COLLECTION_PAGE_SIZE = 12

