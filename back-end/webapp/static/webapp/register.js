function register() {
    $.ajax({
        type: "POST",
        url: "/webapp/register",
        data: {
            "username": form3Example1c.value,
            "password": form3Example4c.value,
            "confirm": form3Example4cd.value
        },
        success: function (response) {
            responsefromserver = response;
            alert(responsefromserver);
            location.replace("/webapp/")
        },
        error: function (response) {
            console.log(response.responseJSON)
            alert(response.responseJSON)
        }
    });
}

function enter() {
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("234").click();
        }
    });
};