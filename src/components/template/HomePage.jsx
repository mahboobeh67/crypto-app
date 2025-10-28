import { useEffect, useState } from "react";
import TableCoins from "../module/TableCoins.jsx";
import { getCoinList } from "../../services/cryptoApi.js";
import Pagination from "../module/Pagination.jsx";
import Search from "../module/Search.jsx";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const[currency, setCurrency]= useState("usd")
  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
     try{
       const res = await fetch(getCoinList(page, currency));
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
     }catch(error){
      console.log(error)
     }
    };
    getData();
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency}/>
      <TableCoins coins={coins} isLoading={isLoading}  />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default HomePage;
