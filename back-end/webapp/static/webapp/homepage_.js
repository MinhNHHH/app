function enter() {
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("123").click();
        }
    });
};

function login() {
    $.ajax({
        type: "POST",
        url: "/webapp/log_in",
        data: {
            "username": username.value,
            "password": password.value,
        },
        success: function(response) {
            responsefromserver = response;
            alert(responsefromserver);
            location.replace("/webapp/inputs")
        },
        error: function(error) {
            console.log(error.responseJSON);
            alert(error.responseJSON);
        }
    });
}