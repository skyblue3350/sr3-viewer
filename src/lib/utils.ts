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
