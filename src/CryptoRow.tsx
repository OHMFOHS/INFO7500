// CryptoRow.tsx
import React from 'react';
import { CryptoCurrency } from '../src/types';
import '../src/style.css';
interface CryptoRowProps {
  data: CryptoCurrency;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ data }) => {
  const changeSymbol = Number(data.change) >= 0 ? '▲' : '▼';
    // 根据数值的正负决定样式类
    const changeStyle = {
      color: Number(data.change) >= 0 ? 'green' : 'red',
    };

    const formatNumber = (number: number | string) => {
      return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2, // 总是显示至少两位小数
        maximumFractionDigits: 2, // 最多显示两位小数
      }).format(Number(number)); // 确保传递给 format 方法的是数字类型
    };
    


  return (
    <tr className="table-row">
      <td>
        <img 
          src={data.iconUrl} 
          alt={`${data.name} icon`} 
          style={{ width: '24px', height: '24px' }} // Adjust the size as needed
        />
      </td>
      <td>{data.name}</td>
      <td>{formatNumber(parseFloat(data.marketCap))} USD</td>
      <td>{formatNumber(data.price)} USD</td>
      <td>{data.rank}</td>
      <td>{formatNumber(data.circulatingSupply ?? '')}</td>
      <td>{formatNumber(parseFloat(data.maxSupply ?? ''))}</td>
      <td style={changeStyle}>
      <span style={changeStyle}>{changeSymbol}</span> {data.change}%
    </td>
      <td>
        <button className = "rowbutton">View</button>
        <button className = "rowbutton">Explore</button>
      </td>
    </tr>
  );
};

export default CryptoRow;