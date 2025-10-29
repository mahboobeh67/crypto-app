import chart_up from "../../assets/chart-up.svg";
import chart_down from "../../assets/chart-down.svg";
import { DNA } from "react-loader-spinner";
import styles from "./TableCoins.module.css";
import { marketChart } from "../../services/cryptoApi";

function TableCoins({ coins, isLoading, setChart, currency }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <DNA height="100" width="100" />
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
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                setChart={setChart}
                currency={currency}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoins;

const TableRow = ({ coin, setChart, currency }) => {
  const {
    id,
    image,
    name,
    symbol,
    total_volume,
    price_change_percentage_24h,
    current_price,
  } = coin;
  const safeChange = price_change_percentage_24h ?? 0;
  const isPositive = safeChange > 0;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id, currency)); // ✅ currency اضافه شد
      const json = await res.json(); // ✅ await اضافه شد
      console.log("✅ Chart data:", json);
      setChart({ ...json, coin: coin });
    } catch (error) {
      console.error("❌ chart fetch error:", error);
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>${current_price.toLocaleString()}</td>
      <td className={safeChange > 0 ? styles.success : styles.error}>
        {safeChange.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={isPositive ? chart_up : chart_down} alt="trend" />
      </td>
    </tr>
  );
};
