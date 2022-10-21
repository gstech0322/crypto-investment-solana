import AssetsModel from './AssetsModel';
import { computed } from 'mobx';

interface IAssetsModel {
  assetsModel: AssetsModel;
}

class AssetsViewModel implements IAssetsModel {
  assetsModel: AssetsModel;

  constructor() {
    this.assetsModel = new AssetsModel();
  }

  @computed get getAssets() {
    return this.assetsModel.fetchAssets();
  }

  isPositive(value: string) {
    if (value[0] !== '-') {
      return true;
    } else {
      return false;
    }
  }

  check_watchlist(value: string) {
    return this.assetsModel.check_watchlist(value);
  }
}

export default AssetsViewModel;
