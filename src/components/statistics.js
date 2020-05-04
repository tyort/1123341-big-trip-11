<<<<<<< HEAD
import AbstractSmartComponent from './abstract-smart-component.js';
=======
import AbstractSmartComponent from './abstract_smart_component.js';
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
import Chart from 'chart.js';
import moment from 'moment';

const createRandomColor = () => {
  const value = Math.floor(Math.random() * 0xffffff);
<<<<<<< HEAD
  return `#${value.toString(16)}`;
};

const createOption = (textContent, symbol) => {
  return {
    plugins: {
      datalabels: {
        display: false,
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          return `${tooltipData}${symbol}`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      position: `left`,
      text: textContent,
      fontSize: 24,
      fontColor: `#000000`
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };
};

const renderMoneyChart = (container, points) => {
  const originalPurpose = [...new Set(points.map((it) => it.type))];
=======

  return `#${value.toString(16)}`;
};

const renderMoneyChart = (container, points) => {
  const originalPurpose = points.map((it) => it.type)
    .filter((item, index, array) => array.indexOf(item) === index);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

  return new Chart(container, {
    type: `horizontalBar`,
    data: {
      labels: originalPurpose,
      datasets: [{
        data: originalPurpose.map((currentPurpose) => {
          return points.filter((point) => point.type === currentPurpose)
            .reduce((acc, itemOfCurrentPurpose) => {
              return acc + itemOfCurrentPurpose.basePrice;
            }, 0);
        }),
        backgroundColor: originalPurpose.map(createRandomColor)
      }]
    },
<<<<<<< HEAD
    options: createOption(`MONEY`, ` €`)
=======
    options: {
      plugins: {
        datalabels: {
          display: false,
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            return `€ ${tooltipData}`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        position: `left`,
        text: `MONEY`,
        fontSize: 24,
        fontColor: `#000000`
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  });
};

const renderTimeSpentChart = (container, points) => {
<<<<<<< HEAD
  const originalPurpose = [...new Set(points.map((it) => it.name))];
=======
  const originalPurpose = points.map((it) => it.name)
    .filter((item, index, array) => array.indexOf(item) === index);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

  return new Chart(container, {
    type: `horizontalBar`,
    data: {
      labels: originalPurpose,
      datasets: [{
        data: originalPurpose.map((currentPurpose) => {
          return Math.floor(points.filter((point) => point.name === currentPurpose)
            .reduce((acc, itemOfPurpose) => {
              const startDate = moment(itemOfPurpose.dateFrom);
              const endDate = moment(itemOfPurpose.dateTo);
              return acc + endDate.diff(startDate, `minutes`);
            }, 0) / 60);
        }),
        backgroundColor: originalPurpose.map(createRandomColor)
      }]
    },
<<<<<<< HEAD
    options: createOption(`TIME SPENT`, `H`)
=======
    options: {
      plugins: {
        datalabels: {
          display: false,
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            return `${tooltipData}H`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        position: `left`,
        text: `TIME SPENT`,
        fontSize: 24,
        fontColor: `#000000`
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  });
};

const renderTransportChart = (container, points) => {
  const inappropriateType = [`Check-in`, `Sightseeing`, `Restaurant`, `Trip`];
<<<<<<< HEAD
  const originalPurpose = [...new Set(points.map((it) => it.type))]
=======
  const originalPurpose = points.map((it) => it.type)
    .filter((item, index, array) => array.indexOf(item) === index)
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    .filter((item) => !inappropriateType.includes(item));

  return new Chart(container, {
    type: `horizontalBar`,
    data: {
      labels: originalPurpose,
      datasets: [{
        data: originalPurpose.map((currentPurpose) => {
          return points.filter((point) => point.type === currentPurpose).length;
        }),
        backgroundColor: originalPurpose.map(createRandomColor)
      }]
    },
<<<<<<< HEAD
    options: createOption(`TRANSPORT`, `x`)
=======
    options: {
      plugins: {
        datalabels: {
          display: false,
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            return `${tooltipData}x`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        position: `left`,
        text: `TRANSPORT`,
        fontSize: 24,
        fontColor: `#000000`
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            suggestedMax: 5
          }
        }]
      }
    }
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  });
};

const createStatisticsTemplate = () => (
  `<section class="statistics">
    <h2 class="">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`
);

export default class Statistics extends AbstractSmartComponent {
  constructor(points) {
    super();

    this._points = points;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();
    this.reRender(this._points);
  }

  recoveryListeners() {}

  reRender(points) {
    this._points = points;
    super.reRender();
    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCanvas = element.querySelector(`.statistics__chart--money`);
    const transportCanvas = element.querySelector(`.statistics__chart--transport`);
    const timeSpentCanvas = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCanvas, this._points.getPointsByFilter());
    this._transportChart = renderTransportChart(transportCanvas, this._points.getPointsByFilter());
    this._timeSpentChart = renderTimeSpentChart(timeSpentCanvas, this._points.getPointsByFilter());
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpentChart) {
      this._timeSpentChart.destroy();
      this._timeSpentChart = null;
    }
  }
}
