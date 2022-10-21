import AssetModel from './AssetModel';
import { action, computed } from 'mobx';

interface IAssetViewModel {
  assetModel: AssetModel;
}

class AssetViewModel implements IAssetViewModel {
  assetModel: AssetModel;

  constructor() {
    this.assetModel = new AssetModel();
  }

  @action setAssetName = (id: string) => {
    this.assetModel.slug = id;
  };

  @computed get getAsset() {
    return this.assetModel.fetchAsset();
  }

  @computed get getAssetPriceChart() {
    return this.assetModel.fetchAssetPriceChart();
  }

  isPositive(value: string) {
    if (value[0] !== '-') {
      return true;
    } else {
      return false;
    }
  }
}

export default AssetViewModel;
