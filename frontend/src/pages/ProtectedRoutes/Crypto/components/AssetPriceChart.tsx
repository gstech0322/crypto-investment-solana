import React from 'react';
import AssetViewModel from '../AssetViewModel';
import Card from '@mui/material/Card';
import { ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';

interface IMarketDataObj {
  Timestamp: string;
  Prices: number;
}

interface Props {
  viewModel: AssetViewModel;
  market_chart_data: IMarketDataObj[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <>
        <h5>{`$${payload[0].value.toLocaleString()}`}</h5>
        <h6>{payload[0]['payload']['Timestamp'].split(' ')[0]}</h6>
      </>
    );
  }
  return null;
};

const AssetPriceChart: React.FC<Props> = (props) => {
  const { viewModel, market_chart_data } = props;
  return (
    <div className="price-chart-container">
      <Card
        sx={{
          color: 'white',
          bgcolor: '#121214',
          height: '60vh',
          borderRadius: '10px',
        }}
      >
        <h4>{viewModel.assetModel.symbol}/USD Price Chart</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={market_chart_data}>
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="Price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AssetPriceChart;
