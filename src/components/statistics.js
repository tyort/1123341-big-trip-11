import AbstractSmartComponent from './abstract_smart_component.js';

const createRandomColor = () => {
  const value = Math.floor(Math.random() * 0xffffff);

  return `#${value.toString(16)}`;
};

const renderMoneyChart = (container, points) => {
  const originalPurpose = points.map((it) => it.waybillType)
    .filter((item, index, array) => array.indexOf(item) === index); // массив оригинальных типов

  return new window.Chart(container, {
    type: `horizontalBar`,
    data: {
      labels: originalPurpose,
      datasets: [{
        data: originalPurpose.map((currentPurpose) => {
          return points.filter((point) => point.waybillType === currentPurpose)
            .reduce((acc, itemOfCurrentPurpose) => {
              return acc + itemOfCurrentPurpose.price;
            }, 0);
        }), // массив денег потраченных в сумме для каждого типа
        backgroundColor: originalPurpose.map(createRandomColor)
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false, // легенда возле названия типа
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data; // массив евро
            const tooltipData = allData[tooltipItem.index]; // количество евро для элемента под курсором
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
      title: {// титульное название
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
  });
};

const renderTimeSpentChart = (container, points) => {
  const originalPurpose = points.map((it) => it.waybillPurpose)
    .filter((item, index, array) => array.indexOf(item) === index); // массив оригинальных мест назначений

  return new window.Chart(container, {
    type: `horizontalBar`,
    data: {
      labels: originalPurpose,
      datasets: [{
        data: originalPurpose.map((currentPurpose) => {
          return Math.floor(points.filter((point) => point.waybillPurpose === currentPurpose)
            .reduce((acc, itemOfPurpose) => {
              const startDate = window.moment(itemOfPurpose.cardItemDate);
              const endDate = window.moment(itemOfPurpose.spendingTime);
              return acc + endDate.diff(startDate, `minutes`);
            }, 0) / 60);
        }),
        backgroundColor: originalPurpose.map(createRandomColor)
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false, // легенда возле названия типа
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data; // массив евро
            const tooltipData = allData[tooltipItem.index]; // количество евро для элемента под курсором
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
      title: {// титульное название
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
  });
};

const renderTransportChart = (container, points) => {
  const inappropriateType = [`Check-in`, `Sightseeing`, `Restaurant`, `Trip`];
  const originalPurpose = points.map((it) => it.waybillType)
    .filter((item, index, array) => array.indexOf(item) === index) // массив оригинальных типов
    .filter((item) => !inappropriateType.includes(item)); // без учета элементов inappropriateType

  return new window.Chart(container, {
    type: `horizontalBar`,
    data: {
      labels: originalPurpose,
      datasets: [{
        data: originalPurpose.map((currentPurpose) => {
          return points.filter((point) => point.waybillType === currentPurpose).length;
        }),
        backgroundColor: originalPurpose.map(createRandomColor)
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false, // легенда возле названия типа
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data; // массив евро
            const tooltipData = allData[tooltipItem.index]; // количество евро для элемента под курсором
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
      title: {// титульное название
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
