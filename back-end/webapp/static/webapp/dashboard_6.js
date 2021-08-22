

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

// draw pie chart
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawpie);
function drawpie() {
    var dataincome = 0;
    var date = new Date();
    var month = toString(date.getMonth());
    for (i =0 ; i < data.income.length; i ++){
        if(month = data.income[i]['time_trade__month']){
            dataincome = data.income[i]['sum']
        }
    }
    var datapie = google.visualization.arrayToDataTable([
        ['Task', 'Money per Month'],
        ['Balance', dataincome + data.trade],
        ['Eat', -data.eat],
        ['Learning', -data.learn],
        ['Shopping', -data.shopping]
        // ['Shopping', data.shoppingaggregate],
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = { 'title': 'My Average Month', 'width': 450, 'height': 350 };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('hello123'));
    chart.draw(datapie, options);

    // draw stack chart
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawStack);
    function drawStack() {
        
        // Define the chart to be drawn.
        var data_stack = google.visualization.arrayToDataTable([
            ['', 'Budget', 'Trade'],
            ['', data.budget + data.trade,  - data.trade],
        ]);

        var options = {
            title: 'My Budget',
            isStacked: 'percent',
            hAxis: {
                minValue: 0,
                ticks: [0,1]
            }
        };

        // Instantiate and draw the chart.
        var chart = new google.visualization.BarChart(document.getElementById('barchart'));
        chart.draw(data_stack, options);
    }
}


//draw line chart

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data_line = [
        ["Month","Income"],
        ["1", 0],
        ["2", 0],
        ["3", 0],
        ["4", 0],
        ["5", 0],
        ["6", 0],
        ["7", 0],
        ["8", 0],
        ["9", 0],
        ["10", 0],
        ["11", 0],
        ["12", 0],
    ]
    for (i = 0; i < data_line.length; i++){
        for (j = 0; j < data.income.length; j++){
            if (data_line[i][0] == data.income[j]['time_trade__month']){
                data_line[i][1] = data.income[j]['sum']
            }
        }
    }
    var dataline = google.visualization.arrayToDataTable(data_line);
    var options = {
        title: 'Money Monthly',
    };

    var chart = new google.visualization.LineChart(document.getElementById('linechart'));

    chart.draw(dataline, options);
}