import React from 'react';
import AssetViewModel from '../AssetViewModel';
import Card from '@mui/material/Card';
import '../Asset.css';

interface Props {
  viewModel: AssetViewModel;
}
const AssetQuickStats: React.FC<Props> = (props) => {
  const { viewModel } = props;
  return (
    <div className="price-quick-stats">
      <Card
        sx={{
          color: 'white',
          bgcolor: '#121214',
          borderRadius: '10px',
        }}
      >
        <span className="wrap-quick-stats">
          <h4>${viewModel.assetModel.price}</h4>
          {viewModel.assetModel.percent_change_24h.charAt(0) === '-' ? (
            <h6 className="price-change-24h">
              {viewModel.assetModel.percent_change_24h}%
            </h6>
          ) : (
            <h6 className="price-change-24h-green">
              {viewModel.assetModel.percent_change_24h}
            </h6>
          )}
        </span>
      </Card>
    </div>
  );
};

export default AssetQuickStats;
