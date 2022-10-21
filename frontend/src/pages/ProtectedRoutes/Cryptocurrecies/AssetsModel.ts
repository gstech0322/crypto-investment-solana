import { observable } from 'mobx';
import { IAssetsModel } from './Interface/IAssetsModel';
class AssetsModel {
  @observable assetsList: IAssetsModel[] = [];

  convertToObject = (data: any): IAssetsModel => {
    const obj = {
      rank: data.market_data.market_cap_rank,
      id: data.id,
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      logo: data.image.thumb,
      price: data.market_data.current_price.usd.toLocaleString(),
      market_cap: data.market_data.market_cap.usd.toLocaleString(),
      percent_change_24h:
        data.market_data.price_change_percentage_24h.toLocaleString(),
      percent_change_7d:
        data.market_data.price_change_percentage_7d.toLocaleString(),
      volume_24h: data.market_data.total_volume.usd.toLocaleString(),
      is_in_watchlist: data.is_in_watchlist,
    };
    return obj;
  };
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

  fetchAssets = () => {
    const url = 'https://crypto-app-tapa.herokuapp.com/api/cryptocurrencies';
    const options = this.get_options('GET', null);

    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item: any) => {
          this.assetsList.push(this.convertToObject(item));
        });
        return this.assetsList;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  check_watchlist = (value: string) => {
    const url = 'https://crypto-app-tapa.herokuapp.com/api/watchlist';
    const body = JSON.stringify({
      value,
    });
    let options = this.get_options('POST', body);

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

export default AssetsModel;
