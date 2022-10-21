import WatchListModel from './WatchListModel';
import { computed } from 'mobx';

interface IWatchListViewModel {
  assetModel: WatchListModel;
}

class WatchListViewModel implements IWatchListViewModel {
  assetModel: WatchListModel;

  constructor() {
    this.assetModel = new WatchListModel();
  }

  @computed get getWatchlist() {
    return this.assetModel.fetchWatchList();
  }

  isPositive(value: string) {
    if (value[0] !== '-') {
      return true;
    } else {
      return false;
    }
  }
}

export default WatchListViewModel;
