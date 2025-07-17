/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraficoTorta = ({ reporte }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  console.log('reporte: ', reporte)

  useEffect(() => {
    if (chartRef.current && reporte) {
      const chartCanvas = chartRef.current.getContext('2d');

      // Destruir la instancia anterior si existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Modificar colores (puede variar según el tipo de gráfico)
      const backgroundColors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ];

      const modifiedReporte = {
        ...reporte,
        datasets: reporte.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor: dataset.backgroundColor || backgroundColors,
        })),
      };

      chartInstance.current = new Chart(chartCanvas, {
        type: 'doughnut',
        data: modifiedReporte,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Reporte',
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [reporte]);

  return <canvas ref={chartRef} />;
};

export default GraficoTorta;
