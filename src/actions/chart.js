import Chart from 'chart.js';

function getRandomNumber(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function getColor(min, max, opacity) {
  return `rgba(${getRandomNumber(min, max)}, ${getRandomNumber(
    min,
    max
  )}, ${getRandomNumber(min, max)}, ${opacity})`;
}

export function chart(node, { labels, data }) {
  const chart = new Chart(node, {
    type: 'pie',
    data: {
      labels,
      datasets: [
        {
          label: '# of Votes',
          data,
          backgroundColor: data.map((item) => getColor(200, 255, 1)),
          borderWidth: 1
        }
      ]
    }
  });

  return {
    destroy() {
      chart.destroy();
    }
  };
}
