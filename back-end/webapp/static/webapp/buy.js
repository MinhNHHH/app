function enterz() {
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("buyz").click();
        }
    });
};

function buy() {
    $.ajax({
        type: "POST",
        url: "/webapp/buy",
        data: {
            "money": amount.value,
            "fields": id.value,
        },
        success: function (response) {
            responsefromserver = response;
            location.replace("/webapp/buy")
        },
        error: function (error) {
            console.log(error.responseJSON)
            alert(error.responseJSON)
        }
    });
}

function myFunction() {
document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('#dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
};
