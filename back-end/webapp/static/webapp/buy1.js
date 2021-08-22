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
            alert(responsefromserver)
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
function show_events(){
    $(".body-half-screen").empty();
    $(".body-half-screen").show(250);
    for(i = 0; i < data.length; i++)
        {
            var event_tr = $("<tr></tr>");
            var event_filed = $("<td>"+ data[i]['categorize']+"</td>");
            var event_money = $("<td>"+data[i]['money']+ "VNĐ" +"</td>");
            var event_time = $("<td>"+data[i]['time_trade']+"</td>");
            $(event_tr).append(event_filed).append(event_money).append(event_time);
            $(".body-half-screen").append(event_tr);
        }
        // $(event_tr).append(event_filed).append(event_money).append(event_time);
        // $(".body-half-screen").append(event_tr);
}
