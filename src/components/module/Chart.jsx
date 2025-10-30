import { useState } from "react";
import convertData from "../../helpers/convertData";
import styles from "./Chart.module.css";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");

  // برای بستن مودال با کلیک روی فضای تار دورش
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains(styles.container)) {
      setChart(null);
    }
  };
  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };
  return (
    <div className={styles.container} onClick={handleBackgroundClick}>
      <div className={styles.chart} onClick={(e) => e.stopPropagation()}>
        {/* دکمه بستن مودال */}
        <span className={styles.cross} onClick={() => setChart(null)}>
          X
        </span>

        {/* نام کوین و لوگو */}
        <div className={styles.name}>
          <img src={chart.coin.image} alt={chart.coin.name} />
          <p>{chart.coin.name}</p>
        </div>

        {/* نمودار اصلی */}
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>

        {/* دکمه‌های انتخاب نوع داده */}
        <div className={styles.type} onClick={typeHandler}>
          <button
            className={type === "prices" ? styles.selected : ""}
            onClick={() => setType("prices")}
          >
            Prices
          </button>
          <button
            className={type === "market_caps" ? styles.selected : ""}
            onClick={() => setType("market_caps")}
          >
            Market Caps
          </button>
          <button
            className={type === "total_volumes" ? styles.selected : ""}
            onClick={() => setType("total_volumes")}
          >
            Total Volumes
          </button>
        </div>

        {/* جزئیات قیمت‌ها، درون باکس مودال */}
        <div className={styles.details}>
          <div>
            <p>Price:</p>
            <span>${chart.coin.current_price}</span>
          </div>
          <div>
            <p>ATH:</p>
            <span>${chart.coin.ath}</span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>{chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey={type} stroke="#3784ff" strokeWidth={2} />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" hide />
        <Legend />
        <Tooltip formatter={(v) => "$" + v.toLocaleString()} />
      </LineChart>
    </ResponsiveContainer>
  );
};
