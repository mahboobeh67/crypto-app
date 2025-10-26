import { useEffect, useState } from "react";
import TableCoins from "../module/TableCoins.jsx"

function HomePage() {
  const [coins, setCoins]= useState([])
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&local=en&x_cg_demo_api_key=CG-2hEdyVeWV511V4NMo1vj5t7v"
    )
      .then((res) => res.json())
      .then((json) => setCoins(json));;
  }, []);
  return <div><TableCoins coins={coins}/></div>;
}

export default HomePage;
