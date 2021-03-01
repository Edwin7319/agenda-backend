const moment = require('moment');

const isValidDate = (date) => {

    if (!date) {
        return false;
    }

    return moment(date, 'DD/MM/YYYY').isValid();
}

module.exports = {isValidDate};