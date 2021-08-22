function save() {
    $.ajax({
        type: "POST",
        url: "/webapp/inputs",
        data: {
            "budget": budget.value,
            "income": income.value
        },
        success: function (response) {
            responsefromserver = response;
            location.replace("/webapp/dashboard")
        },
        error: function (error) {

            alert(error.responseJSON)
        }
    });
}

function enter() {
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("334").click();
        }
    });
};

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
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