import { cdate } from "cdate"

/**
 * 左辺の配列要素に右辺の配列要素を足します。
 * @param left
 * @param right 
 * @returns 計算結果
 */
export const sumArray = (left: number[], right: number[]): number[] => {
  return left.map((value, index) => {
    return value + right[index]
  })
}

export const timeToCdate = (time: number) => {
  const base = cdate('2001-01-01 09:00')
  return base.add(time, 'seconds')
}
