// dependencies 
const express = require("express");
const handleBars = require('express-handlebars');

// set port
const PORT = process.env.PORT || 8080;

// start using express
const app = express();

    // serve static content from public directory
    app.use(express.static("public"));

    // parse middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

// use handlebars
app.engine('handlebars', handleBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes
const routes = require("./controllers/burgers_controller");
app.use(routes);

// initiate server
app.listen(PORT, () => {
    console.log("Gather round, children, and listen to http://localhost:" + PORT);
});
