export const validator = (type, value) => {

    switch (type) {

        case `email`:
        case `correo`:
        case `mail`:

            if (!value) {
                return `You must insert a ${type}`
            } else if (typeof (value) !== `string`) {
                return `Incorrect ${type}, it should only contain strings`
            } else if (value.length > 100) {
                return `${type} is too long, max 100 characters`
            } else if (! /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
                return `Invalid ${type} format`;
            } else {
                return ``;
            }

        case `name`:
        case `surname`:
        case `full_name`:

            if (!value) {
                return `You must insert a ${type}`
            } else if (typeof (value) !== `string`) {
                return `Incorrect ${type}, it should only contain strings`
            } else if (value.length > 50) {
                return `${type} is too long, max 50 characters`
            } else {
                return ``
            }

        case `phone`:
        case `phone_number`:
        case `telefono`:

            if (!value) {
                return `You must insert a number`
            } else if (value.length > 12) {
                return `Number too long, max 12 numbers`
            } else if (! /(?=.*?[0-9])/.test(value)) {
                return `You can insert only numbers`;
            } else {
                return ``;
            }

        case `password`:
        case `password2`:
        case `contraseña`:
            if (!value) {
                return `You must insert a ${type}`
            } else if (typeof (value) !== `string`) {
                return `${type} is incorrect; only strings are allowed. Please try again`
            } else if (value.length > 100) {
                return `${type} is too long, max100 characters`
            } else if (! /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{4,12}$/.test(value)) {
                return `Invalid ${type} format`;
            } else {
                return ``;
            }
    }
}