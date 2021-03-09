// Recreating some functionality from the Lodash library.

const _ = {
    clamp(number, lower, upper) {
        return Math.min(Math.max(number, lower), upper);
    },
    inRange(number, start, end) {
        if (end === undefined) {
            end = start;
            start = 0;
        }
        if (start > end) {
            let temp = start;
            start = end;
            end = temp; 
        }
        return (number >= start && number < end);
    },
    words(str) {
        return str.split(' ');
    },
    pad(str, length) {
        if (length <= str.length) {
            return str;
        }
        const startPadLength = Math.floor((length - str.length) / 2);
        const endPadLength = length - str.length - startPadLength;
        return ' '.repeat(startPadLength) + str + ' '.repeat(endPadLength);
    },
    has(obj, key) {
        if (key in obj) {
            return true;
        }
        return false;
    },
    /* ALTERNATELY:
    has(obj, key) {
        if (obj[key] === undefined) {
            return false;
        }
        return true;
    }
    */
   invert(obj) {
       const newObj = {};
       for (let key in obj) {
           newObj[String(obj[key])] = key;
       }
       return newObj;
   },
   findKey(obj, predicate) {
       for (let key in obj) {
           if (predicate(obj[key]) === true) {
               return key;
           }
       }
       return undefined;
   },
   drop(arr, num) {
       if (num === undefined) {
           num = 1;
       }
       return arr.slice(num)
   },
   dropWhile(arr, predicate) {
       const sliceFrom = arr.findIndex((el, index) => !(predicate(el, index, arr)));
       return this.drop(arr, sliceFrom);
   },
   chunk(arr, size) {
       if (size === undefined) {
           size = 1;
       }
       const newArr = [];
       for (let i=0; i < arr.length; i+= size) {
           const chunk = arr.slice(i, i+size);
           newArr.push(chunk);
       }
       return newArr;
   }
};

module.exports = _;