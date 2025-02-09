const getChartOptions = () => ({
    title: { text: "Stock Chart with Annotations" },
    series: [{ name: "Stock Price", data: [100, 110, 120, 130, 125, 140] }],
    annotations: [
      {
        labels: [{ point: { x: 3, y: 130, xAxis: 0, yAxis: 0 }, text: "Peak" }],
        shapes: [
          {
            type: "path",
            points: [
              { x: 2, y: 120, xAxis: 0, yAxis: 0 },
              { x: 3, y: 130, xAxis: 0, yAxis: 0 },
              { x: 4, y: 125, xAxis: 0, yAxis: 0 },
            ],
            stroke: "red",
            strokeWidth: 2,
          },
        ],
      },
    ],
  });
  
  export default getChartOptions;
  