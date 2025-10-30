import { useEffect, useState } from "react";
import TableCoins from "../module/TableCoins.jsx";
import { getCoinList} from "../../services/cryptoApi.js";
import Pagination from "../module/Pagination.jsx";
import Search from "../module/Search.jsx";
import Chart from "../module/Chart.jsx";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        setCoins(json);
      } catch (error) {
        console.error("Error fetching coin list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCoins();
  }, [page, currency]);

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoins coins={coins} isLoading={isLoading} setChart={setChart} currency={currency} />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;
