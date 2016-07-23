var backgroundColor = [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ]

var borderColor =  [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255,99,132,1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]

var hoverBackgroundColor = [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ]

Chart.defaults.global.defaultFontSize = 14;
Chart.defaults.global.defaultFontFamily = "'Lato', sans-serif";

Chart.defaults.groupableBar = Chart.helpers.clone(Chart.defaults.bar);

var helpers = Chart.helpers;
Chart.controllers.groupableBar = Chart.controllers.bar.extend({
  calculateBarX: function (index, datasetIndex) {
    // position the bars based on the stack index
    var stackIndex = this.getMeta().stackIndex;
    return Chart.controllers.bar.prototype.calculateBarX.apply(this, [index, stackIndex]);
  },

  hideOtherStacks: function (datasetIndex) {
    var meta = this.getMeta();
    var stackIndex = meta.stackIndex;

    this.hiddens = [];
    for (var i = 0; i < datasetIndex; i++) {
      var dsMeta = this.chart.getDatasetMeta(i);
      if (dsMeta.stackIndex !== stackIndex) {
        this.hiddens.push(dsMeta.hidden);
        dsMeta.hidden = true;
      }
    }
  },

  unhideOtherStacks: function (datasetIndex) {
    var meta = this.getMeta();
    var stackIndex = meta.stackIndex;

    for (var i = 0; i < datasetIndex; i++) {
      var dsMeta = this.chart.getDatasetMeta(i);
      if (dsMeta.stackIndex !== stackIndex) {
        dsMeta.hidden = this.hiddens.unshift();
      }
    }
  },

  calculateBarY: function (index, datasetIndex) {
    this.hideOtherStacks(datasetIndex);
    var barY = Chart.controllers.bar.prototype.calculateBarY.apply(this, [index, datasetIndex]);
    this.unhideOtherStacks(datasetIndex);
    return barY;
  },

  calculateBarBase: function (datasetIndex, index) {
    this.hideOtherStacks(datasetIndex);
    var barBase = Chart.controllers.bar.prototype.calculateBarBase.apply(this, [datasetIndex, index]);
    this.unhideOtherStacks(datasetIndex);
    return barBase;
  },

  getBarCount: function () {
    var stacks = [];

    // put the stack index in the dataset meta
    Chart.helpers.each(this.chart.data.datasets, function (dataset, datasetIndex) {
      var meta = this.chart.getDatasetMeta(datasetIndex);
      if (meta.bar && this.chart.isDatasetVisible(datasetIndex)) {
        var stackIndex = stacks.indexOf(dataset.stack);
        if (stackIndex === -1) {
          stackIndex = stacks.length;
          stacks.push(dataset.stack);
        }
        meta.stackIndex = stackIndex;
      }
    }, this);

    this.getMeta().stacks = stacks;
    return stacks.length;
  },
});


// 
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Simple Interest", "Mensuration", "Algebra"],
        datasets: [{
            label: '# of Votes',
            data: [1503, 8592, 920],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            hoverBackgroundColor: hoverBackgroundColor,
            borderWidth: 1
        }]
    }
});


//

var data = {
  labels: ["Week1", "Week2", "Week3", "Week4"],
    datasets: [
    {
        label: "Simple Interest",
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
          
        ],
        hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 99, 132, 0.7)',
        ],
        data: [67.33, 78.89, 87.46, 84],
        stack: 1,
        borderWidth: 1
    },
    {
        label: "Mensuration",
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)', 
        ],
        hoverBackgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(54, 162, 235, 0.7)',
        ],
        data: [68.03, 82.24, 88, 87],
        stack: 2,
        borderWidth: 1
    },
    {
        label: "Algebra",
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
        ],
        hoverBackgroundColor: [
            'rgba(255, 206, 86, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(255, 206, 86, 0.7)', 
        ],
      data: [79.13, 83.88, 82, 71],
      stack: 3,
      borderWidth: 1
    }
  ]
};

var ctx = document.getElementById("myChart1").getContext("2d");
new Chart(ctx, {
  type: 'groupableBar',
  data: data,
  options: {
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
        },
        stacked: true,
      }]
    }
  }
});

// 3rd


var data = {
  labels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
  datasets: [
    {
      label: "1st Week",
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      data: [11, 19, 65, 21, 50, 23],
      stack: 1
    },
    
     {
      label: "2nd Week",
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      data: [6, 10, 19, 14, 35, 11],
      stack: 2
    },
     {
      label: "3rd Week",
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      data: [11, 7, 10, 13, 32, 40],
      stack: 3
    },
    {
      label: "4th Week",
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      data: [3.9, 4.18, 9, 21, 53, 20],
      stack: 4
    }
  ]
};

var ctx = document.getElementById("myChart2").getContext("2d");
new Chart(ctx, {
  type: 'groupableBar',
  data: data,
  options: {
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
        },
        stacked: true,
      }]
    }
  }
});


// 4th 

var ctx = document.getElementById("myChart3");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["1st Week", "2nd Week", "3rd Week", "4th Week"],
        datasets: [{
            label: 'Avg Time For Mensuration Questions (in secs)',
            data: [32, 16, 14, 18],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            hoverBackgroundColor: hoverBackgroundColor,
            borderWidth: 1
        }]
    }
});


// 5th

var ctx = document.getElementById("myChart5");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Fast + Right", "Fast + Wrong"],
        datasets: [{
            label: '# of Votes',
            data: [225, 35],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            hoverBackgroundColor:hoverBackgroundColor,
            borderWidth: 1
        }]
    }
});

var ctx = document.getElementById("myChart6");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Fast + Right", "Fast but Wrong"],
        datasets: [{
            label: '# of Votes',
            data: [1330, 102],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            hoverBackgroundColor:hoverBackgroundColor,
            borderWidth: 1
        }]
    }
});

var ctx = document.getElementById("myChart7");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Fast + Right", "Fast but Wrong"],
        datasets: [{
            label: '# of Votes',
            data: [1980, 92],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            hoverBackgroundColor:hoverBackgroundColor,
            borderWidth: 1
        }]
    }
});

var ctx = document.getElementById("myChart8");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Fast + Right", "Fast but Wrong"],
        datasets: [{
            label: '# of Votes',
            data: [605, 34],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            hoverBackgroundColor:hoverBackgroundColor,
            borderWidth: 1
        }]
    }
});

// 9th
var ctx = document.getElementById("myChart9");

var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["1st Week", "2nd Week", "3rd Week", "4th Week"],
        datasets: [{
            label: 'Total # of Questions Attempted',
            data: [408, 55, 76, 5],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            hoverBackgroundColor:hoverBackgroundColor,
            borderWidth: 1
        }]
    }
});


// 10

var ctx = document.getElementById("myChart10");

var myBarChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Simple Interest", "Mensuration", "Algebra"],
        datasets: [{
            label: '# of questions per sub topic',
            data: [16, 384, 137],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            hoverBackgroundColor:hoverBackgroundColor,
            borderWidth: 1
        }]
    }
});

// 11

var ctx = document.getElementById("myChart11");

var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Simple Interest", "Mensuration", "Algebra"],
        datasets: [{
            label: '% of correct answers',
            data: [50, 61, 81],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            hoverBackgroundColor:hoverBackgroundColor,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
          yAxes: [{
            ticks: {
              max: 100,
              min: 0
            }
          }]
        }
    }
});

// 12

var data = {
  labels: ["Simple Interest", "Mensuration", "Algebra"],
  datasets: [
    {
      label: "Class Average",
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      data: [74, 82, 81],
      stack: 1
    },
    
     {
      label: "Student's Average",
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      data: [50, 61, 81],
      stack: 2
    },
  ]
};

var ctx = document.getElementById("myChart12").getContext("2d");
new Chart(ctx, {
  type: 'groupableBar',
  data: data,
  options: {
    legend: {
        fullWidth: true
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 100
        },
        stacked: true,
      }]
    }
  }
});