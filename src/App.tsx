// App.tsx
import React, { useState, useEffect } from 'react';
import CryptoTable from '../src/CryptoTable';
import { CryptoCurrency } from '../src/types';

const App: React.FC = () => {

  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch('https://api.coinranking.com/v2/coins');
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data.coins)) {
          setCryptos(data.data.coins);
        } else {
          console.error('Data is not an array', data);
        }
      } catch (error) {
        console.error('Fetching cryptos failed', error);
      }
    };
  
    fetchCryptos();
  }, []);

//  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([
//     // 这里是模拟数据
//     {
//       id: 1,
//       name: 'Bitcoin',
//       marketCap: '1,014,392,686,658 USD',
//       price: '51,669.30 USD',
//       circulatingSupply: '19,632,406.00',
//       maxSupply: '21,000,000.00',
//       change24h: '-0.94%',
//       lastUpdated: '8 minutes ago',
//     },
//     // 添加更多的模拟数据
//   ]);

  return (
    <div>
      <header>Your Header</header>
      <CryptoTable cryptos={cryptos} />
    </div>
  );
};

export default App;
