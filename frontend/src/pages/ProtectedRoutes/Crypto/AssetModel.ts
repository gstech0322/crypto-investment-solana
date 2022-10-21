import { observable } from 'mobx';
import { IAssetModel } from './Interface/IAssetModel';
class AssetModel {
  @observable assetList: IAssetModel[] = [];
  @observable priceChartList: number[][] = [];
  @observable slug: string = '';
  @observable rank: string = '';
  @observable id: string = '';
  @observable name: string = '';
  @observable symbol: string = '';
  @observable homepage: string = '';
  @observable logo: string = '';
  @observable price: string = '';
  @observable all_time_high: string = '';
  @observable all_time_low: string = '';
  @observable market_cap: string = '';
  @observable volume_24h: string = '';
  @observable percent_change_24h: string = '';
  @observable percent_change_7d: string = '';

  setDataAfterFetch(data: any) {
    this.rank = data.market_cap_rank;
    this.id = data.id;
    this.name = data.name;
    this.symbol = data.symbol.toUpperCase();
    this.homepage = data.links.homepage[0];
    this.logo = data.image.small;
    this.price = data.market_data.current_price.usd.toLocaleString();
    this.all_time_high = data.market_data.ath.usd.toLocaleString();
    this.all_time_low = data.market_data.atl.usd.toLocaleString();
    this.market_cap = data.market_data.market_cap.usd.toLocaleString();
    this.volume_24h = data.market_data.total_volume.usd.toLocaleString();
    this.percent_change_24h =
      data.market_data.price_change_percentage_24h.toLocaleString();
    this.percent_change_7d =
      data.market_data.price_change_percentage_7d.toLocaleString();
  }

  convertToObject(): IAssetModel {
    const obj = {
      rank: this.rank,
      id: this.id,
      name: this.name,
      symbol: this.symbol,
      homepage: this.homepage,
      logo: this.logo,
      price: this.price,
      all_time_high: this.all_time_high,
      all_time_low: this.all_time_low,
      market_cap: this.market_cap,
      volume_24h: this.volume_24h,
      percent_change_24h: this.percent_change_24h,
      percent_change_7d: this.percent_change_7d,
    };
    return obj;
  }
  
  get_options = (method_type: string, body: any) => {
    const token = localStorage.getItem('user');
    const options = {
      method: method_type,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: body,
    };
    return options;
  };

  fetchAsset = () => {
    const url = `https://crypto-app-tapa.herokuapp.com/api/cryptocurrencies/${this.slug}`;
    const options = this.get_options('GET', null);

    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        this.setDataAfterFetch(data);
        this.assetList.push(this.convertToObject());
        return this.assetList;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchAssetPriceChart = () => {
    const url = `https://crypto-app-tapa.herokuapp.com/api/cryptocurrencies/chart/${this.slug}`;
    const options = this.get_options('GET', null);

    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export default AssetModel;
