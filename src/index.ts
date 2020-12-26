const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 400
if (ctx === null) {
  throw new Error('Webgl is not detected')
}

const ff = 350
const curve4: TCubicBezierCurve = {
  p1: { x: 0.496 * ff, y: 0.003 * ff },
  p2: { x: 0 * ff, y: 0.4 * ff },
  p3: { x: 1.01 * ff, y: 0.4 * ff },
  p4: { x: 0.499 * ff, y: 0 * ff }
}

ctx.transform(1, 0, 0, -1, 0, canvas.height)
ctx.translate(300 + 0.5, 200 + 0.5)
ctx.strokeStyle = '#ffffff'
ctx.globalAlpha = 0.2
ctx.lineWidth = 1
ctx.beginPath()
ctx.moveTo(0, -200)
ctx.lineTo(0, 400)
ctx.stroke()
ctx.beginPath()
ctx.moveTo(-300, 0)
ctx.lineTo(600, 0)
ctx.stroke()
ctx.globalAlpha = 1

const tx = -50
const ty = 50
const triangles = [
  tx, ty, 50, 50, 50, -50,
  tx, ty, 50, -50, -50, -50,
  50, 50, 150, 50, 150, -50,
  50, 50, 150, -50, 50, -50,
]

const multiply = 1

// drawPoint(ctx, { x: tx, y: ty })
// const point = rotatePoint(0, 0, gradToRad(30), { x: tx * multiply, y: ty * multiply })
// drawPoint(ctx, point)

// drawRectangle(ctx, triangles, 4)

const bone1: IBone = {
  start: { x: 155, y: 0 },
  end: { x: -85, y: 0 },
  width: 8
}
// drawBone(ctx, bone1)

const ccurve = curve4

// for (let i = -1; i <= 2; i += 0.1) {
//   const point = cubicQxy(i, ccurve)
//   // console.log(i, point)
//   drawPoint(ctx, scalePoint(point, curvePointScale), 3)
// }
// drawPoint(ctx, ccurve.p1, 4, '#ff000d')
// drawPoint(ctx, ccurve.p2, 4, '#ff000d')
// drawPoint(ctx, ccurve.p3, 4, '#ff000d')
// drawPoint(ctx, ccurve.p4, 4, '#ff000d')

// const line1: TVector = {
//   start: { x: -220, y: 80 },
//   end: { x: 120, y: -80 }
// }
// drawLine(ctx, line1)

// type TBandPoint = TPoint & {
//   prc: number
// }
// const bandPoints: TBandPoint[] = [
//   { x: 20, y: 0, prc: 0 },
//   { x: 20, y: 30, prc: 0.1 },
//   { x: 20, y: 60, prc: 0.2  },
//   { x: 20, y: 90, prc: 0.3 },
//   { x: 20, y: 120, prc: 0.4 },
//   { x: 20, y: 150, prc: 0.5 },
//   { x: 20, y: 180, prc: 1 },
// ]
//
// for (let pi = 0; pi < bandPoints.length; pi += 1) {
//   const point = bandPoints[pi]
//   drawPoint(ctx, point)
//
//   // const prc = (pi + 1) / bandPoints.length
//   const rpoint = rotatePoint(20, 0, gradToRad(-30 * point.prc), point)
//   drawPoint(ctx, rpoint, 4, '#ff8a09')
// }

// const fpoint = { x: 20, y: 0 }
// const mpoint = { x: 20, y: 30 }
//
// drawPoint(ctx, fpoint)
// drawPoint(ctx, mpoint, 3)
//
// const forcePoint = { x: 120, y: 120 }
// drawPoint(ctx, forcePoint, 3, '#0031ff')
//
// const fmlen = getVectorLength({ start: fpoint, end: mpoint })
// console.log('fmlen', fmlen)
// const fflen = getVectorLength({ start: fpoint, end: forcePoint })
// console.log('fflen', fflen)
//
// const p = getPointByDistanceOnVector({ start: fpoint, end: forcePoint }, fflen * 0.45 - fmlen)
// drawPoint(ctx, p, 3, '#ff0087')

// const pointOnLine = getPointByDistanceOnVector(line1, 100)
// drawPoint(ctx, pointOnLine, 6, '#00fff6')
// const lineP = getPerpendicularVectorForVector(line1, 120, pointOnLine)
// drawLine(ctx, lineP)

// const rect1 = { start: { x: 20, y: 20 }, width: 120, height: 60 }
// const rect = rect1
// const rectCenterPoint = getRectCenterPoint(rect)
// drawRect(ctx, rect)
// drawPoint(ctx, rectCenterPoint)
// const basePoint = {x: 140, y: 80}
// drawPoint(ctx, basePoint, 5, '#fff008')
// const scaleRect = scaleRectFromPoint(rect, 2, basePoint)
// drawRect(ctx, scaleRect)

// const triangle1 = [-50, 30, 50, 60, 80, -50]
// const triangle = triangle1
// drawTrianglesByPointRaw(ctx, triangle, 1)
// const tpoints = convertRawCoordinatesToPointArray(triangle)
// const rect = createRectFromPointArray(tpoints)
// drawRect(ctx, rect)

// let lastPoint = cubicQxy(0, ccurve)
// for (let i = 0.1; i <= 1; i += 0.1) {
//   const point = cubicQxy(i, ccurve)
//   const vector = { start: lastPoint, end: point }
//   // const pc = getVectorCenterPoint(vector)
//   // const lineP = getPerpendicularVectorForVector(vector, 4, pc)
//   // drawLine(ctx, lineP)
//   drawLine(ctx, vector)
//   // console.log(i, point)
//   drawPoint(ctx, point, 4)
//   lastPoint = point
// }

// drawCubicBezierCurve(ctx, ccurve)
// const tpoints = convertCubicBezierCurveToPointArray(ccurve)
// const rect = createRectFromPointArray(tpoints)
// drawRect(ctx, rect)

const vectors = cubicBezierCurveToVectors(ccurve, 4)
const vpoints = vectorsToPointArray(vectors)
const rect = createRectFromPointArray(vpoints)
drawRect(ctx, rect)
for (let vi = 0; vi < vectors.length; vi += 1) {
  const vector = vectors[vi]
  drawLine(ctx, vector)
  drawPoint(ctx, vector.start, 4)
  drawPoint(ctx, vector.end, 4)
}

// const dot = getBezierCurveCubicPos(0.02, bezierCurveToPointValue(ccurve, 'y'))
// console.log(dot)

// const bone2: IBone = {
//   start: {x: 25, y: -25},
//   end: {x: 75, y: 75},
//   width: 8
// }
// drawBone(ctx, bone2)

function cubicBezierCurveToVectors (curve: TCubicBezierCurve, count: number) {
  const result: TVector[] = []
  const step = 1 / count
  let lastPoint = cubicQxy(0, curve)
  for (let i = step; i <= 1; i += step) {
    const point = cubicQxy(i, ccurve)
    result.push({ start: lastPoint, end: point })
    lastPoint = point
  }

  return result
}

function vectorsToPointArray (vectors: TVector[]): TPoint[] {
  const result: TPoint[] = []
  vectors.map(vector => {
    result.push(vector.start)
    result.push(vector.end)
  })

  return result
}

function drawCubicBezierCurve (ctx: CanvasRenderingContext2D, curve: TCubicBezierCurve) {
  ctx.strokeStyle = '#b2ff09'
  ctx.beginPath()
  ctx.moveTo(
    curve.p1.x,
    curve.p1.y,
  )
  ctx.bezierCurveTo(
    curve.p2.x,
    curve.p2.y,
    curve.p3.x,
    curve.p3.y,
    curve.p4.x,
    curve.p4.y
  )
  ctx.stroke()
}

function convertRawCoordinatesToPointArray (raw: number[]): TPoint[] {
  const list: TPoint[] = []

  for (let i = 0; i < raw.length; i += 2) {
    list.push({ x: raw[i], y: raw[i + 1] })
  }

  return list
}

function scaleRectFromPoint (rect: TRect, factor: number, basePoint: TPoint): TRect {
  const points = rectToPointArray(rect)
  const indexPointRect = points.map(point => {
    const dist = getDistanceByPoints(point, basePoint)
    return dist == 0 ? point : getPointByDistanceOnVector({ start: basePoint, end: point }, dist * factor)
  })

  return createRectFromPointArray(indexPointRect)
}

function createRectFromPointArray (points: TPoint[]): TRect {
  const x = Math.min.apply(null, points.map(point => point.x))
  const y = Math.min.apply(null, points.map(point => point.y))
  const width = Math.max.apply(null, points.map(point => point.x)) - x
  const height = Math.max.apply(null, points.map(point => point.y)) - y

  return { start: { x, y }, width, height }
}

function drawRect (ctx: CanvasRenderingContext2D, rect: TRect, color = '#219820') {
  const x = rect.start.x
  const y = rect.start.y
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + rect.width, y)
  ctx.lineTo(x + rect.width, y + rect.height)
  ctx.lineTo(x, y + rect.height)
  ctx.lineTo(x, y)
  ctx.stroke()
}

type  TPointOfDistance = TPoint & {
  ratio: number
}

type TRect = {
  start: TPoint
  width: number
  height: number
}

function getRectCenterPoint (rect: TRect): TPoint {
  return {
    x: rect.start.x + rect.width / 2,
    y: rect.start.y + rect.height / 2,
  }
}

function rectToNamedPoints (rect: TRect): TRectNamedPoints {
  return {
    leftTop: rect.start,
    leftBottom: { ...rect.start, y: rect.start.y + rect.height },
    rightTop: { ...rect.start, x: rect.start.x + rect.width },
    rightBottom: { x: rect.start.x + rect.width, y: rect.start.y + rect.height },
  }
}

function convertCubicBezierCurveToPointArray (curve: TCubicBezierCurve): TPoint[] {
  return [curve.p1, curve.p2, curve.p3, curve.p4]
}

function rectToPointArray (rect: TRect): TPoint[] {
  return [rect.start,
    { ...rect.start, y: rect.start.y + rect.height },
    { ...rect.start, x: rect.start.x + rect.width },
    { x: rect.start.x + rect.width, y: rect.start.y + rect.height }
  ]
}

interface TRectNamedPoints {
  leftTop: TPoint,
  leftBottom: TPoint,
  rightTop: TPoint,
  rightBottom: TPoint,
}

/**
 * When 0 < ratio < 1, the point is on the line.
 * When ratio < 0, the point is outside the line near to (sx, xy).
 * When ratio > 1, the point is outside the line near to (ex, ey).
 *
 * @param vector
 * @param distance
 *
 * @see https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point/1630886#1630886
 */
function getPointByDistanceOnVector (vector: TVector, distance: number): TPointOfDistance {
  const vectorLen = getVectorLength(vector)
  const ratio = distance / vectorLen

  return getPointByRatioOnVector(vector, ratio)
}

/**
 * When 0 < ratio < 1, the point is on the line.
 * When ratio < 0, the point is outside the line near to (sx, xy).
 * When ratio > 1, the point is outside the line near to (ex, ey).
 *
 * @param vector
 * @param ratio
 *
 * @see https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point/1630886#1630886
 */
function getPointByRatioOnVector (vector: TVector, ratio: number): TPointOfDistance {
  const x = (1 - ratio) * vector.start.x + ratio * vector.end.x
  const y = (1 - ratio) * vector.start.y + ratio * vector.end.y

  return { x, y, ratio }
}

function gradToRad (angle: number) {
  return angle * Math.PI / 180
}

function scalePoints (points: TPoint[], scale: number): TPoint[] {
  return points.map(point => scalePoint(point, scale))
}

function scalePoint (point: TPoint, scale: number): TPoint {
  return {
    x: point.x * scale,
    y: point.y * scale
  }
}

function drawLine (ctx: CanvasRenderingContext2D, line: TVector, color = '#981449') {
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(line.start.x, line.start.y)
  ctx.lineTo(line.end.x, line.end.y)
  ctx.stroke()
}

function drawTrianglesByPointRaw (ctx: CanvasRenderingContext2D, triangles: number[], triangleCount: number, color = '#985203') {
  ctx.strokeStyle = color
  for (let ti = 0; ti < triangles.length; ti += 1) {
    const offset = ti * triangles.length / triangleCount
    ctx.beginPath()
    ctx.moveTo(triangles[offset] * multiply, triangles[offset + 1] * multiply)
    ctx.lineTo(triangles[offset + 2] * multiply, triangles[offset + 3] * multiply)
    ctx.lineTo(triangles[offset + 4] * multiply, triangles[offset + 5] * multiply)
    ctx.lineTo(triangles[offset] * multiply, triangles[offset + 1] * multiply)
    ctx.stroke()
  }
}

// drawPoint(ctx, 80, 80)
// const point = rotatePoint(50, 50, 90, {x: 80, y:80})
// drawPoint(ctx, point.x, point.y)

// ctx.beginPath();
// ctx.moveTo(triangles[0] * multiply, triangles[1] * multiply);
// ctx.lineTo(100,50);
// ctx.lineTo(50, 100);
// ctx.lineTo(0, 90);
// ctx.closePath();
// ctx.fill();

function drawPoint (ctx: CanvasRenderingContext2D, point: TPoint, size = 6, color = '#1e982b') {
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(point.x, point.y - size)
  ctx.lineTo(point.x, point.y + size)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(point.x - size, point.y)
  ctx.lineTo(point.x + size, point.y)
  ctx.stroke()
}

function drawBone (ctx: CanvasRenderingContext2D, bone: IBone, size = 6, color = '#006d98') {
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(bone.start.x, bone.start.y - size)
  ctx.lineTo(bone.start.x, bone.start.y + size)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(bone.start.x - size, bone.start.y)
  ctx.lineTo(bone.start.x + size, bone.start.y)
  ctx.stroke()

  // center line
  // ctx.beginPath()
  // ctx.moveTo(bone.start.x, bone.start.y)
  // ctx.lineTo(bone.end.x, bone.end.y)
  // ctx.stroke()

  const centerX = (bone.end.x + bone.start.x) / 2
  const centerY = (bone.end.y + bone.start.y) / 2
  // drawPoint(ctx, centerX, centerY)

  const lenOfVector = Math.sqrt(Math.pow(bone.end.x - bone.start.x, 2) + Math.pow(bone.end.y - bone.start.y, 2))
  const halfLenOfVector = lenOfVector / 2
  const angleRad = Math.atan(bone.width / halfLenOfVector)
  const side1 = rotatePoint(bone.start.x, bone.start.y, angleRad, { x: centerX, y: centerY })
  // drawPoint(ctx, side1.x, side1.y)
  const side2 = rotatePoint(bone.start.x, bone.start.y, -angleRad, { x: centerX, y: centerY })
  // drawPoint(ctx, side2.x, side2.y)

  ctx.beginPath()
  ctx.moveTo(bone.start.x, bone.start.y)
  ctx.lineTo(side1.x, side1.y)
  ctx.moveTo(bone.start.x, bone.start.y)
  ctx.lineTo(side2.x, side2.y)
  ctx.moveTo(bone.end.x, bone.end.y)
  ctx.lineTo(side1.x, side1.y)
  ctx.moveTo(bone.end.x, bone.end.y)
  ctx.lineTo(side2.x, side2.y)
  ctx.stroke()
}

function rotatePoint (cx: number, cy: number, angleInRadian: number, p: TPoint): TPoint {
  const s = Math.sin(angleInRadian)
  const c = Math.cos(angleInRadian)

  const px = p.x - cx
  const py = p.y - cy

  return {
    x: px * c - py * s + cx,
    y: px * s + py * c + cy
  }
}

type TPoint = {
  x: number
  y: number
}

interface IBone {
  start: TPoint
  end: TPoint
  width: number
}

function cubicQxy (t: number, curve: TCubicBezierCurve) {
  // let ax = curve.p1.x
  // ax += (curve.p2.x - curve.p1.x) * t
  // let bx = curve.p2.x
  // bx += (curve.p3.x - curve.p2.x) * t
  // let cx = curve.p3.x
  // cx += (curve.p4.x - curve.p3.x) * t
  //
  // ax += (bx - ax) * t
  // bx += (cx - bx) * t
  //
  // let ay = curve.p1.y
  // ay += (curve.p2.y - curve.p1.y) * t
  // let by = curve.p2.y
  // by += (curve.p3.y - curve.p2.y) * t
  // let cy = curve.p3.y
  // cy += (curve.p4.y - curve.p3.y) * t
  //
  // ay += (by - ay) * t
  // by += (cy - by) * t
  //
  // return ({
  //   x: ax + (bx - ax) * t,
  //   y: ay + (by - ay) * t
  // })

  const x = bezierCurveToPointValue(curve, 'x')
  const y = bezierCurveToPointValue(curve, 'y')

  return {
    x: getBezierCurveCubicPos(t, x),
    y: getBezierCurveCubicPos(t, y),
  }
}

function getBezierCurveCubicPos (t: number, curve: TPointsValue) {
  const tm = 1 - t

  return tm * tm * tm * curve.p1 + 3 * tm * tm * t * curve.p2 + 3 * tm * t * t * curve.p3 + t * t * t * curve.p4
}

function bezierCurveToPointValue (curve: TCubicBezierCurve, d: keyof TPoint): TPointsValue {
  return { p1: curve.p1[d], p2: curve.p2[d], p3: curve.p3[d], p4: curve.p4[d] }
}

type TCubicBezierCurve = {
  p1: TPoint
  p2: TPoint
  p3: TPoint
  p4: TPoint
}

type TPointsValue = {
  p1: number
  p2: number
  p3: number
  p4: number
}

function cubeRoot (x: number) {
  const y = Math.pow(Math.abs(x), 1 / 3)
  return x < 0 ? -y : y
}

// Расчёт коэффециентов только для cubic bezier сurve
// p1 * (-x³ + 3x² - 3x + 1)
// p2 * (3x³ - 6x² + 3x)
// p3 * (-3x³ + 3x²)
// p4
const ppy = bezierCurveToPointValue(ccurve, 'y')
const pp = bezierCurveToPointValue(ccurve, 'x')
const a = -pp.p1 + 3 * pp.p2 - 3 * pp.p3 + pp.p4
const b = 3 * pp.p1 - 6 * pp.p2 + 3 * pp.p3
const c = -3 * pp.p1 + 3 * pp.p2
let d = pp.p1
// Ищем по t по смещению X
const X = 0.6
// let roots = solveCubicPolynomial(a, b, c, d - X)

// roots = roots.filter(root => 0 <= root && root <= 1)
// console.log(roots)

// let t = 0
// console.log('x[t] = x[' + t + '] = ' + getBezierCurveCubicPos(t, pp))
// t = 0.5
// console.log('x[t] = x[' + t + '] = ' + getBezierCurveCubicPos(t, pp))
// t = 1
// console.log('x[t] = x[' + t + '] = ' + getBezierCurveCubicPos(t, pp))
// roots.map((t: number) => console.log('y[t] = y[' + t + '] = ' + getBezierCurveCubicPos(t, ppy)))

// t = 1.5
// console.log('x[t] = x[' + t + '] = ' + getBezierCurveCubicPos(t, pp))

// (ax^3 + bx^2 + c*x + d = 0)
// @see https://www.shsu.edu/kws006/professional/Concepts_files/SolvingCubics.pdf
// @see https://stackoverflow.com/questions/27176423/function-to-solve-cubic-equation-analytically
// @see https://allcalc.ru/node/1826
function solveCubicPolynomial (a: number, b: number, c: number, d: number) {
  if (Math.abs(a) < 1e-8) { // Quadratic case, ax^2+bx+c=0
    a = b
    b = c
    c = d
    if (Math.abs(a) < 1e-8) { // Linear case, ax+b=0
      a = b
      b = c
      if (Math.abs(a) < 1e-8) // Degenerate case
        return []
      return [-b / a]
    }

    const D = b * b - 4 * a * c
    if (Math.abs(D) < 1e-8)
      return [-b / (2 * a)]
    else if (D > 0)
      return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)]
    return []
  }

  // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
  const p = (3 * a * c - b * b) / (3 * a * a)
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a)
  let roots

  if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
    roots = [cubeRoot(-q)]
  } else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
    roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : [])
  } else {
    const D = q * q / 4 + p * p * p / 27
    if (Math.abs(D) < 1e-8) {       // D = 0 -> two roots
      roots = [-1.5 * q / p, 3 * q / p]
    } else if (D > 0) {             // Only one real root
      const u = cubeRoot(-q / 2 - Math.sqrt(D))
      roots = [u - p / (3 * u)]
    } else {                        // D < 0, three roots, but needs to use complex numbers/trigonometric solution
      const u = 2 * Math.sqrt(-p / 3)
      const t = Math.acos(3 * q / p / u) / 3  // D < 0 implies p < 0 and acos argument in [-1..1]
      const k = 2 * Math.PI / 3
      roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)]
    }
  }

  // Convert back from depressed cubic
  for (let i = 0; i < roots.length; i++) {
    roots[i] -= b / (3 * a)
  }

  return roots
}

interface TVector {
  start: TPoint
  end: TPoint
}

function getPerpendicularVectorForVector (vector: TVector, width: number, point: TPoint): TVector {
  const angle = Math.atan2(vector.end.x - vector.start.x, vector.end.y - vector.start.y)
  const start = { x: width * Math.cos(angle) + point.x, y: -width * Math.sin(angle) + point.y }
  const end = { x: -width * Math.cos(angle) + point.x, y: width * Math.sin(angle) + point.y }

  return { start, end }
}

function getVectorCenterPoint (vector: TVector): TPoint {
  return {
    x: (vector.end.x + vector.start.x) / 2,
    y: (vector.end.y + vector.start.y) / 2
  }
}

function getVectorLength (line: TVector) {
  return getDistanceByPoints(line.start, line.end)
}

function getDistanceByPoints (p1: TPoint, p2: TPoint) {
  const x = p1.x - p2.x
  const y = p1.y - p2.y

  return Math.sqrt(x * x + y * y)
}
