$(document).ready(() => {
    //updates the displayed/devoured burgers
    $(".devour-burger").on("click", function(event) {
        let id = $(this).data("id");
        let eaten = $(this).data("eaten");

        let newDevoured = {
            devoured: eaten
        };

        console.log(id);
        console.log(newDevoured);

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevoured
        }).then(() => {
            console.log("burger devoured");
            location.reload();
        });
    });

    // create/POST a new burger
    $(".create-form").on("submit", (event) => {
        event.preventDefault();

        let newBurger = {
            burger_name: $("#burgerSubmit").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(() => {
            console.log("added a new burger to the database");
            location.reload();
        });
    });

    // clears out the displayed burgers
    $(".clearTable").on("click", (event) => {
        $.ajax("/api/burgers", {
            type: "DELETE"
        }).then(() => {
            console.log("table cleared");
            location.reload();
        });
    });

});