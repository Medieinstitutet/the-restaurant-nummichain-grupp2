
import Table from './Table';
import './seatingChart.scss';

const SeatingChart = () => {
  return (
    <div className="seatingChart">
      {Array.from({ length: 15 }).map((_, index) => (
        <Table key={index} />
      ))}
    </div>
  );
};

export default SeatingChart;
