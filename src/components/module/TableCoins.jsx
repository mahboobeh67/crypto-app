import chart_up from "../../assets/chart-up.svg";
import chart_down from "../../assets/chart-down.svg";
import { DNA } from "react-loader-spinner";
import styles from "./TableCoins.module.css";
function TableCoins({ coins, isLoading }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>
          <DNA height="100" width="100" />
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin) => (
              <TableRow coin={coin} key={coin.id} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoins;

const TableRow = ({
  coin: {
    image,
    name,
    symbol,
    total_volume,
    price_change_percentage_24h: price_change,
    current_price,
  },
}) => {
  const safeChange = price_change ?? 0;
  const isPositive = safeChange > 0;

  return (
    <tr>
      <td>
        <div className={styles.symbol}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>${current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {safeChange.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={isPositive ? chart_up : chart_down} alt="trend" />
      </td>
    </tr>
  );
};
