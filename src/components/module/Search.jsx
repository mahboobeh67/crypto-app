import { useState, useEffect } from "react";
import { searchCoin } from "../../services/cryptoApi";
import { DNA as DnaLoader } from "react-loader-spinner";
import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coin, setCoin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (!text.trim()) {
      setCoin([]);
      setIsLoading(false);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();

        console.log("Full API response:", json);

        if (Array.isArray(json.coins)) {
          setCoin(json.coins);
        } else if (json.coin) {
          setCoin([json.coin]);
        } else {
          alert(json?.status?.error_message || "No coin found!");
          setCoin([]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      } finally {
        // ✅ چه موفق چه ناموفق، Loader خاموش شود
        setIsLoading(false);
      }
    };

    search();

    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>

      {(!!coin.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading && (
            <div>
              <DnaLoader width={70} height={70} strokeWidth={2} />
            </div>
          )}

          {!isLoading && coin.length > 0 && (
            <ul>
              {coin.map((c) => (
                <li
                  key={c.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img src={c.thumb} alt={c.name} style={{ marginRight: 8 }} />
                  <p>{c.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
