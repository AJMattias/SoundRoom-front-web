/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraficoReporte = ({ reporte, titulo}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Almacenar la instancia de Chart.js

  useEffect(() => {
    if (chartRef.current && reporte) {
      const chartCanvas = chartRef.current.getContext('2d');

      // Destruir la instancia anterior si existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Modificar los colores del dataset
      const modifiedReporte = {
        ...reporte,
        datasets: reporte.datasets.map(dataset => ({
          ...dataset,
          label: titulo,
          backgroundColor: 'rgba(255, 187, 29)',
          //borderColor: 'rgb(255, 187, 29)',
        })),
      };

      chartInstance.current = new Chart(chartCanvas, {
        type: 'bar',
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

    // Limpiar la instancia al desmontar el componente
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [reporte]);

  return <canvas ref={chartRef} />;
};

export default GraficoReporte;