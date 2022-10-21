import { observable } from 'mobx';
import { IWatchListInterface } from './Interface/IWatchListInterface';

class WatchListModel {
  @observable watchList: IWatchListInterface[] = [];

  convertToObject = (data: any): IWatchListInterface => {
    const obj = {
      id: data.id,
      name: data.name,
      logo: data.image.thumb,
      price: data.market_data.current_price.usd.toLocaleString(),
      percent_change_24h:
        data.market_data.price_change_percentage_24h.toLocaleString(),
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

  fetchWatchList = () => {
    const url = 'https://crypto-app-tapa.herokuapp.com/api/watchlist';
    const options = this.get_options('GET', null);

    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item: any) => {
          this.watchList.push(this.convertToObject(item));
        });
        return this.watchList;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export default WatchListModel;
