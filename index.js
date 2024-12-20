// Remove whitespaces, scopes etc
// Plain phoneNumber
// (777) 200-1991 => 7772001991. Note: Stores withouh country code
export const toPlainPhoneNumber = (phone) => {
    if (!phone) return;
    // Удаляет скобки, пробеи и февизы
    const clearedPhone = String(phone).replace(/[()-\s]/g, '').trim()
    return clearedPhone
};

export const isFileBigger = (file) => {
    if (file instanceof File) {
        if (file.size > 100 * 100 * 100) {
            return true
        } else {
            return false
        }
    } else {
        throw new Error('Wrong format')
    }
}

export const isImage = (file) => {
    if (file instanceof File) {
        if (file.type && file.type.startsWith('image/')) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

/**
 * Переводит вложенность в плоском формате(plain format) ie: user.IDCard.name
 * Converts:
 * const obj = {
    a: 1,
    b: 2,
    c: {
        d: 1,
        f: 2,
        g: {
            h: 3,
            e: {
                k: 4,
                l: 5
            }
        }
    }
}
    
to ===>
Result:  {
  a: 1,
  b: 2,
  'c.d': 1,
  'c.f': 2,
  'c.g.h': 3,
  'c.g.e.k': 4,
  'c.g.e.l': 5
}
 */
export const objectToPlain = (obj, parent = "", result = {}) => {
    if (!obj) {
        return null
    }
    if (Object.keys(obj) > 0) {
        return null
    }

    Object.entries(obj).forEach(([k, v]) => {
        if (parent) {
            k = `${parent}.${k}`
        }
        if (Array.isArray(v)) {
            result[`${k}`] = v
        }
        if (v instanceof FileList) {
            result[`${k}`] = v
        }
        else if (typeof v == "object") {
            return objectToPlain(v, k, result)
        } else {
            result[`${k}`] = v
        }
    });
    return result
}

export const isEmailAddress = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
/**    
 *  Converts 
    data.phone: "87014073428"
    data.language: "English"
    email:"serik.shaikamalov@gmail.com"
    name: "Serik Shaikamalov"
    to =>
    data {
        phone: "87014073428",
        language: "English"
    },
    email: "serik.shaikamalov@gmail.com",
    name: "Serik Shaikamalov"
 */
export const convertToNestedJSON = (input) => {
    if (!input)
        throw new Error('Please provide input data')
    if (typeof input !== "object")
        throw new Error('Input is not object')
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (!value) return acc
        if (key.includes('.')) {
            let properties = key.split('.')
            return Object.assign(acc, {
                [properties[0]]: acc[properties[0]] ?
                    Object.assign({}, acc[properties[0]], { [properties[1]]: value }) :
                    Object.assign({}, { [properties[1]]: value })
            })
        }
        acc[key] = value
        return acc
    }, {})
}

/**
 * @description Used to update value of form fields 
  fields: [
   {
      key: "name",
      label: "Name",
      required: true,
      inputType: inputTypeEnum.text,
      value: ""
    },
    etc
    ]
 */
export const updateForm = (fields, key, property, value) => {
    if (Array.isArray(fields)) {
        return fields.map(f => {
            if (f.key === key) {
                return {
                    ...f,
                    [property]: value
                }
            }
            return f
        })
    }
    throw new Error('Bad input')
}

// For demo request
export function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

export function groupBy(arr, key) {
    return arr.reduce(function (acc, x) {
        (acc[x[key]] = acc[x[key]] || []).push(x);
        return acc;
    }, {});
}


/**
 * Converts 7772001991 to (777)200-1991 
 * if you pass prefix it will be removed
 */
export const phoneToUI = (phone, prefix = 7, mask = "(...)...-....") => {
    // Для каждой страны есть своя маска
    return String(phone).replace(new RegExp(`^${prefix}`, 'g'), '').replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
}

// phone: (777)200-1991
// В базе данных будет хранится 77772001991
// На UI будет такой формат: (777)200-1991
export const phoneToBackendFormat = (phone, countryCode = '7') => {
    if (!phone) return;
    // Удаляет скобки, пробеи и февизы
    const clearedPhone = String(phone).replace(/[()-\s]/g, '').trim()
    return `${countryCode}${clearedPhone}`
};


/**
 * Получаем только номер без страны
 */
export function getPhoneNumber(fullPhoneNumber, countryCode = 7) {
    if (!fullPhoneNumber || !countryCode) {
        return ""
    }

    const result = []
    const fullPhoneNumberArray = fullPhoneNumber.split('')
    const countryCodeArray = String(countryCode).split('')

    for (let i = 0; i < fullPhoneNumberArray.length; i++) {
        if (countryCodeArray[i] === fullPhoneNumberArray[i]) {
        } else {
            result.push(fullPhoneNumberArray[i])
        }
    }

    return result.join('')
}
export function toFullPhoneNumber(phoneNumber, countryCode) {
    return `${countryCode}${phoneNumber}`
}