// CryptoRow.tsx
import React from 'react';
import { CryptoCurrency } from '../src/types';

interface CryptoRowProps {
  data: CryptoCurrency;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ data }) => {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.marketCap}</td>
      <td>{data.price}</td>
      <td>{data.rank}</td>
      <td>
        <button>View</button>
        <button>Explore</button>
      </td>
    </tr>
  );
};

export default CryptoRow;