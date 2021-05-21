const moment = require('moment');

const isValidDate = (date) => {

    if (!date) {
        return false;
    }

    return moment(date, 'YYYY-MM-DD').isValid();
}

module.exports = {isValidDate};