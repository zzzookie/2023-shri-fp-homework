/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import { allPass, anyPass, prop } from 'ramda'

const isSameColor = color => shapesStrOrObj => {
  const shapes = typeof shapesStrOrObj === 'string'
    ? [shapesStrOrObj]
    : Object.values(shapesStrOrObj)
  return shapes.every(shape => shape === color)
}

const countColor = color => shapesObj => Object.values(shapesObj).filter(shape => shape === color).length

const getTriangle = prop('triangle')
const getCircle = prop('circle')
const getSquare = prop('square')
const getStar = prop('star')

const isWhite = isSameColor('white')
const isOrange = isSameColor('orange')
const isGreen = isSameColor('green')
const isBlue = isSameColor('blue') 
const isRed = isSameColor('red')

const countWhite = countColor('white')
const countOrange = countColor('orange')
const countGreen = countColor('green')
const countBlue = countColor('blue') 
const countRed = countColor('red')

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ circle, square, triangle, star }) => isRed(star) && isGreen(square) && isWhite({triangle, circle})

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figs) => countGreen(figs) >= 2;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figs) => countRed(figs) === countBlue(figs)

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({ circle, square, star }) => isBlue(circle) && isRed(star) && isOrange(square);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figs) => Math.max(countGreen(figs), countRed(figs), countBlue(figs), countOrange(figs)) >= 3;

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (figs) => countGreen(figs) === 2 && countRed(figs) === 1 && isGreen(figs.triangle)

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figs) => isOrange(figs);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star }) => !(isRed(star) || isWhite(star));

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => isGreen(shapes);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ square, triangle }) => triangle === square && !isWhite(triangle);
