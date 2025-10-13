import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import type { Despesa } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface GraficoGastosProps {
  despesas: Despesa[];
  ano: string;
}

const GraficoGastos = ({ despesas, ano }: GraficoGastosProps) => {
  console.log('GraficoGastos - despesas recebidas:', despesas.length);
  
  const gastosPorTipo = despesas.reduce((acc, despesa) => {
    const tipo = despesa.tipoDespesa;
    if (!acc[tipo]) {
      acc[tipo] = 0;
    }
    acc[tipo] += despesa.valorLiquido;
    return acc;
  }, {} as Record<string, number>);

  console.log('Gastos por tipo:', gastosPorTipo);

  const topGastos = Object.entries(gastosPorTipo)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  console.log('Top 8 gastos:', topGastos);

  const cores = [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#4facfe',
    '#43e97b',
    '#fa709a',
    '#fee140',
    '#30cfd0',
  ];

  // Dados para o gráfico de pizza
  const dadosPizza = {
    labels: topGastos.map(([tipo]) => tipo),
    datasets: [
      {
        label: 'Valor Gasto (R$)',
        data: topGastos.map(([, valor]) => valor),
        backgroundColor: cores,
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Dados para o gráfico de barras
  const dadosBarras = {
    labels: topGastos.map(([tipo]) => tipo),
    datasets: [
      {
        label: 'Valor Gasto (R$)',
        data: topGastos.map(([, valor]) => valor),
        backgroundColor: cores,
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  // Configurações dos gráficos
  const opcoesPizza = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: number }) => {
            const valor = context.parsed;
            return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          },
        },
      },
    },
  };

  const opcoesBarras = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { y: number } }) => {
            const valor = context.parsed.y;
            return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) => {
            return `R$ ${(Number(value) / 1000).toFixed(0)}k`;
          },
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  // Calcula total gasto no ano
  const totalGasto = despesas.reduce((sum, d) => sum + d.valorLiquido, 0);

  return (
    <div className="graficos-container">
      <h2 className="graficos-titulo">📊 Análise de Gastos - {ano}</h2>
      
      {/* Card com total */}
      <div className="total-card">
        <span className="total-label">Total Gasto no Ano</span>
        <span className="total-valor">
          R$ {totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Grid com os gráficos */}
      <div className="graficos-grid">
        {/* Gráfico de Pizza */}
        <div className="grafico-card">
          <h3>Distribuição por Categoria</h3>
          <div className="grafico-wrapper">
            <Pie data={dadosPizza} options={opcoesPizza} />
          </div>
        </div>

        {/* Gráfico de Barras */}
        <div className="grafico-card">
          <h3>Top 8 Categorias de Gastos</h3>
          <div className="grafico-wrapper">
            <Bar data={dadosBarras} options={opcoesBarras} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoGastos;
