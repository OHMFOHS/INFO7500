import React, { useState, useEffect } from 'react';
import CryptoTable from '../src/CryptoTable';
import { CryptoCurrency } from '../src/types';
import '../src/style.css';

const API_KEY = 'ca03946605mshd8750eb9ab2c318p14f711jsn46f75ccce0ef';
const API_HOST = 'coinranking1.p.rapidapi.com';

const App: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 或根据需要调整每页项目数

  // 点击页码时的处理函数
  const goToPage = (number: number) => {
    setCurrentPage(number);
  };


  useEffect(() => {
// 使用一个简单的延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const fetchCryptos = async () => {
  try {
    const response = await fetch('https://api.coinranking.com/v2/coins');
    const data = await response.json();
    if (data && data.data && Array.isArray(data.data.coins)) {
      const coins: CryptoCurrency[] = data.data.coins;

      const coinsWithSupply = [];
      for (const coin of coins) {
        try {
          const supplyResponse = await fetch(`https://${API_HOST}/coin/${coin.uuid}/supply`, {
            headers: {
              'X-RapidAPI-Key': API_KEY,
              'X-RapidAPI-Host': API_HOST,
            },
          });
          const supplyData = await supplyResponse.json();
          if (supplyData && supplyData.status === 'success') {
            coinsWithSupply.push({
              ...coin,
              circulatingSupply: supplyData.data.supply.circulatingAmount,
              maxSupply: supplyData.data.supply.maxAmount,
            });
          } else {
            coinsWithSupply.push(coin);
          }
          await delay(2000); // 等待x秒后再发送下一个请求
        } catch (error) {
          console.error('Fetching supply data failed', error);
          coinsWithSupply.push(coin);
        }
      }
      setCryptos(coinsWithSupply);
    }
  } catch (error) {
    console.error('Fetching cryptos failed', error);
  }
};
    fetchCryptos();
  }, []);
// 计算当前页面的加密货币
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = cryptos.slice(indexOfFirstItem, indexOfLastItem);
// 分页控件逻辑
const totalPages = Math.ceil(cryptos.length / itemsPerPage);
const nextPage = () => {
  setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
};

const prevPage = () => {
  setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
};

  return (
    
    <div>
    <header className="header">Top50 Market Data</header>
    <div className="table-container">
      <CryptoTable cryptos={currentItems} />
    </div>
    <div className="button-container">
      <button onClick={prevPage} className={`button ${currentPage === 1 ? 'disabled' : ''}`}>Prev</button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick={nextPage} className={`button ${currentPage === totalPages ? 'disabled' : ''}`}>Next</button>
    </div>
  </div>
  );
};

export default App;
