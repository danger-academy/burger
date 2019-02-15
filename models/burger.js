const orm = require("../config/orm");

// orm methods
const burger = {
    // orm method displays complete table data
    all: (cb) => {
        orm.all("burgers", (res) => {
            cb(res);
        });
    },
    // orm method inserts one value into specific column
    insert: (cols, vals, cb) => {
        orm.insert("burgers", cols, vals, (res) => {
            cb(res);
        });
    },
    // orm method updates a value in specific column if conditions are met
    update: (objColVals, condition, cb) => {
        orm.update("burgers", objColVals, condition, (res) => {
            cb(res);
        });
    },
    // orm method clears the displayed data
    delete: (condition, cb) => {
        orm.delete("burgers", condition, (res) => {
            cb(res);
        });
    }
};

module.exports = burger;