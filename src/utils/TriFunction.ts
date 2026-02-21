/**
 * Return a number which is its sin value (unit: radius)
 * @param x unit: degree
 */
export function sin(x: number): number{
  return Math.sin(x * (Math.PI/180))
}

/**
 * Return a number which is its cos value (unit: radius)
 * @param x unit: degree
 */
export function cos(x: number): number{
  return Math.cos(x * (Math.PI/180))
}