import { objectToPlain } from './index.js'

const input = {
    a: 1,
    b: {
        c: 2
    },
    d: [3, 4]
}
const result = objectToPlain(input)
console.log("Result: ", result);
