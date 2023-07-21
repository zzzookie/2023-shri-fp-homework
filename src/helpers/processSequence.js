import Api from '../tools/api';
import { tap, pipe, curry, allPass, gt, lt, equals, pipeWith, ifElse } from 'ramda'

const api = new Api();

const isPositive = value => gt(value, 0)
const longerThan2 = value => gt(value.length, 2)
const shorterThan10 = value => lt(value.length, 10)
const isNumber = value => equals(typeof Number(value), 'number')

const validate = (string) =>
  allPass([isPositive, longerThan2, shorterThan10, isNumber])(string)
    ? string
    : 'ValidationError'

const round = async value => Math.round(Number(value))
const lengthCount = async string => string.length

const getSquare = async value => value ** 2;
const getRemainder = async value => value % 3;

const getApiResult = api => async value => {
  const apiAnswer = await api(value)
  const answer = await apiAnswer
  return answer.result
  // function retry() {
  //   try {
  //     result = answer.result
  //     return answer
  //   } catch (error) {
      
  //   }
  // }
}

const queryBinaryValue = async number => await api.get('https://api.tech/numbers/base', { number, from: 10, to: 2 })
const queryAnimalName = async id => api.get(`https://animals.tech/${id}`, {});

const getBinaryValue = getApiResult(queryBinaryValue)
const getAnimalName = getApiResult(queryAnimalName)

const processSequence = async ({value, writeLog, handleSuccess, handleError}) => {
  const log = curry(tap)(writeLog)
  const error = curry(tap)(handleError)

  const pipeAsyncLogged = (fns) => {
    return pipeWith(async (f, prevRes) => {
      const value = await prevRes
      Number(value) && log(value)
      return f(value)
    })(fns)
  };

  const getAnimal = pipeAsyncLogged([
    round,
    getBinaryValue,
    lengthCount,
    getSquare,
    getRemainder,
    getAnimalName,
    handleSuccess
  ])
  
  pipe(
    log,
    validate,
    ifElse(
      equals('ValidationError'),
      error,
      getAnimal
    )
  )(value)
}

export default processSequence;
