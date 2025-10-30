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
                key={coin.id}
                coin={coin}
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

// 🧩 TableRow: نمایش هر کوین با فرمت ارزی درست
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

  // تابع هوشمند برای فرمت ارز براساس ارز انتخاب‌شده
  const formatCurrency = (num) => {
    try {
      return num.toLocaleString(undefined, {
        style: "currency",
        currency: currency.toUpperCase(),
      });
    } catch {
      // اگر مرورگر ارز خاصی رو نشناسه، بدون علامت نشون بده
      return num.toLocaleString();
    }
  };

  // هندل کلیک روی نماد برای نمایش چارت
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id, currency));
      const json = await res.json();
      console.log("✅ Chart Data:", json);
      setChart({ ...json, coin });
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

      {/* ✅ فرمت عدد ارزی بر اساس انتخاب کاربر */}
      <td>{formatCurrency(current_price)}</td>

      <td className={isPositive ? styles.success : styles.error}>
        {safeChange.toFixed(2)}%
      </td>

      <td>{formatCurrency(total_volume)}</td>

      <td>
        <img
          src={isPositive ? chart_up : chart_down}
          alt={isPositive ? "up trend" : "down trend"}
        />
      </td>
    </tr>
  );
};
