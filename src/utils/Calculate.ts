/**
 * 
 * @param dimensions 
 * @param angleX 
 * @param angleZ 
 * @param UNIT 
 * @returns 
 */
export function calculateDimensions (dimensions:number[], angleX:number=30 , angleZ:number=-60, UNIT:number=50) :string[] {
  var [, width, length] = dimensions.map(value => `${value * UNIT}px`);
  var heightCos = `${dimensions[0] * Math.cos(angleX * (Math.PI/180)) * Math.cos(angleZ * (Math.PI/180)) * UNIT}px`;
  var heightSin = `${dimensions[0] * Math.cos(angleX * (Math.PI/180)) * Math.sin(angleZ * (Math.PI/180)) * UNIT}px`;
  return [ width, length, heightCos, heightSin ];
};

