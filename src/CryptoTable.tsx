// CryptoTable.tsx
import React from 'react';
import CryptoRow from '../src/CryptoRow';
import { CryptoCurrency } from '../src/types';

interface CryptoTableProps {
  cryptos: CryptoCurrency[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ cryptos }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Market Cap</th>
          <th>Price</th>
          <th>rank</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {cryptos.map((crypto) => (
          <CryptoRow key={crypto.id} data={crypto} />
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;