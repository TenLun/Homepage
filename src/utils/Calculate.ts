/**
 * Return calculated HWL
 * @param dimensions 
 * @param angleX 
 * @param angleZ 
 * @param UNIT 
 * @returns width, length, heightCos, heightSin
 */
export function calculateDimensions (dimensions:number[], angleX:number=30 , angleZ:number=-30, UNIT:number=50) :string[] {
  var [height, width, length] = dimensions.map(value => value);
  var heightCos = height * Math.sin(angleX * (Math.PI/180)) * Math.cos(Math.PI/2 - angleZ * (Math.PI/-180));
  var heightSin = height * Math.sin(angleX * (Math.PI/180)) * Math.sin(Math.PI/2 - angleZ * (Math.PI/-180));
  return [ width, length, heightCos, heightSin ].map(value => `${value * UNIT}px`);
};

//-60