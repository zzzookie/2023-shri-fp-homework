import { allPass, anyPass, applySpec, count, curry, equals, flip, gt, gte, lte, not, pipe, prop, propEq, useWith, values } from 'ramda'

const isSameColor = color => shapesStrOrObj => {
  const shapes = typeof shapesStrOrObj === 'string'
    ? [shapesStrOrObj]
    : Object.values(shapesStrOrObj)
  return shapes.every(shape => shape === color)
}

// const countColor = color => shapesObj => Object.values(shapesObj).filter(shape => shape === color).length

// const all = Object.values

const triangle = prop('triangle')
const square = prop('square')
const circle = prop('circle')
const star = prop('star')

const isWhite = isSameColor('white')
const isOrange = isSameColor('orange')
const isGreen = isSameColor('green')
const isBlue = isSameColor('blue') 
const isRed = isSameColor('red')

const lessOrEq = curry(flip(lte))
const moreOrEq = curry(flip(gte))
const eq = curry(equals)

const countWhite = count(isWhite)
const countOrange = count(isOrange)
const countGreen = count(isGreen)
const countBlue = count(isBlue)
const countRed = count(isRed)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  pipe(star, isRed),
  pipe(square, isGreen),
  pipe(triangle, isWhite),
  pipe(circle, isWhite),
])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(values, countGreen, moreOrEq(2))

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = pipe(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useWith(equals, [pipe(values, countRed), pipe(values, countBlue)]) // !!
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  pipe(square, isOrange),
  pipe(circle, isBlue),
  pipe(star, isRed),
])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
// export const validateFieldN5 = (figs) => Math.max(countGreen(figs), countRed(figs), countBlue(figs), countOrange(figs)) >= 3;
export const validateFieldN5 = anyPass([
  pipe(values, countOrange, moreOrEq(3)),
  pipe(values, countGreen, moreOrEq(3)),
  pipe(values, countBlue, moreOrEq(3)),
  pipe(values, countRed, moreOrEq(3)),
])

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  pipe(values, countRed, eq(1)),
  pipe(values, countGreen, eq(2)),
  pipe(triangle, isGreen),
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = pipe(values, countOrange, moreOrEq(4))

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
  pipe(star, isRed, not),
  pipe(star, isWhite, not),
])

// 9. Все фигуры зеленые.
export const validateFieldN9 = pipe(values, countGreen, moreOrEq(4))

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = v => {
  return equals(v.triangle, v.square)
}
// pipe(triangle, isWhite, not),
