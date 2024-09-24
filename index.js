// phone: (777)200-1991
// В базе данных будет хранится +77772001991
// На UI будет такой формат: (777)200-1991
export const phoneToBackendFormat = (phone, countryCode = '7') => {
    if (!phone) return;
    // Удаляет скобки, пробеи и февизы
    const clearedPhone = String(phone).replace(/[()-\s]/g, '').trim()
    return `${countryCode}${clearedPhone}`
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
    if (typeof obj !== "object") {
        return null
    }

    Object.entries(obj).forEach(([k, v]) => {
        if (parent) {
            k = `${parent}.${k}`
        }
        if (typeof v == "object") {
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