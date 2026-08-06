import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// تسجيل إعدادات Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StockChart({ products, totalStock }) {
  // ترتيب المنتجات تنازلياً حسب الكمية (من الأكبر للأصغر)
  const sortedProducts = [...products].sort((a, b) => {
    const countA = parseInt(a.count) || 0;
    const countB = parseInt(b.count) || 0;
    return countB - countA;
  });

  let labels = [];
  let percentageData = [];

  sortedProducts.forEach((product) => {
    labels.push(product.title.toUpperCase());
    const count = parseInt(product.count) || 0;
    const percent = totalStock > 0 ? ((count / totalStock) * 100).toFixed(1) : 0;
    percentageData.push(percent);
  });

  if (sortedProducts.length === 0) {
    labels = ['لا توجد منتجات'];
    percentageData = [0];
  }

  const vibrantColors = [
    '#7b1fa2', '#00e676', '#ff5252', '#ffeb3b', '#00b0ff',
    '#ff9100', '#e040fb', '#00e5ff', '#ff6e40', '#b2ff59'
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'النسبة المئوية من المخزون (%)',
        data: percentageData,
        backgroundColor: percentageData.map((_, i) => vibrantColors[i % vibrantColors.length]),
        borderWidth: 0,
        borderRadius: 3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` النسبة: ${context.parsed.y}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + '%'
        }
      }
    }
  };

  return (
    <div className="single-chart-box" style={{ height: '350px' }}>
      <h3>
        <i className="fas fa-chart-bar"></i> نسبة كل منتج من إجمالي مخزون المستودع (%)
      </h3>
      <div style={{ height: '280px', position: 'relative' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default StockChart;

