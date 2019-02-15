// import connection to mysql db
const connection = require('./connection');

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push('?');
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(object) {
    let arr = [];

    for (let key in object) {
        let value = object[key];

        if (Object.hasOwnProperty.call(object, key)) {
            if (typeof value === 'string' && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

// orm objects

const orm = {
    // select all from database
    all: (tableInput, cb) => {
        let queryString = "SELECT * FROM ??;";
        connection.query(queryString, [tableInput], (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // insert one burger into database
    insert: (table, cols, vals, cb) => {
        let queryString = "INSERT INTO " + table;
        
        // queryString += ' (';
        // queryString += cols.toString();
        // queryString += ') ';
        // queryString += 'VALUES (';
        // queryString += printQuestionMarks(vals.length);
        // queryString += ') ';
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (?);";
        
        console.log(queryString);

        connection.query(queryString, [vals], (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // update one burger into database
    update: (table, objColVals, condition, cb) => {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: (table, condition, cb) => {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if (err) throw err;

            cb(result);
        });
    }
};

// export orm
module.exports = orm;