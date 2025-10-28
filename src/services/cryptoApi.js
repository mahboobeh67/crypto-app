
const BASE_URL = "https://api.coingecko.com/api/v3"
const API_KEY = "CG-2hEdyVeWV511V4NMo1vj5t7v"
const getCoinList = (page, currency) => {
    return `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&local=en&x_cg_demo_api_key=${API_KEY}`
    
 }
 const searchCoin = query => 
    `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`
 export {getCoinList, searchCoin};