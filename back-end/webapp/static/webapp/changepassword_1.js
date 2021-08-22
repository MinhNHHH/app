function change(){
    $.ajax({
        type: "POST",
        url: "/webapp/change_password",
        data: {
            "currentpass" : inputPasswordOld.value,
            "newppass" : inputPasswordNew.value,
            "confirmpass" : inputPasswordNewVerify.value
        },
        success: function(response){
            responsefromserver = response;
            alert("Change password sucess")
            location.replace("/webapp/change_password")
            
        },
        error: function(response){
            alert(response.responseJSON)
        }
    });
};


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

function enter() {
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("123").click();
        }
    });
};
    