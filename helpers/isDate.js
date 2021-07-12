const moment = require('moment');

const isDate = ( value ) => {
    console.log(moment("100000"));

    if ( !value ) {
        return false;
    }

    const fecha = moment( value );
    console.log(fecha);
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
    
}



module.exports = { isDate };

