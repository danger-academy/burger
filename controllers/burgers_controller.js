// require dependencies
const express = require('express');
const router = express.Router();

// require model
const burger = require('../models/burger');

// index redirect
router.get("/", (req, res) => {
    res.redirect("/burgers");
});

// index page
router.get("/burgers", (req, res) => {
    burger.all((data) => {

        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

// POST route
router.post("/api/burgers", (req, res) => {
    burger.insert("burger_name", req.body.burger_name, (result) => {
        res.json({id: result.insertId});
    });
});

// PUT route
router.put("/api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;

    console.log(condition);

    burger.update(
        {
            devoured: req.body.devoured
        },
        condition,
        (result) => {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

// DELETE route
router.delete("/api/burgers", (req, res) => {
    let condition = "devoured = true";
    burger.delete(condition, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// export router
module.exports = router;