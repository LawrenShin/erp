import React,{Component} from 'react';

export default class Status extends Component {
  render(){
    return (
      <div class="status">
        <div class="status__head">
          <div class="status-title">{this.props.title}</div>
          <div class="status-search">
            <form action="#">
              <div class="status-search__content">
                <div class="search-bl">
                  <input type="text" class="search-bl__input" />
                  <button type="submit" class="search-bl__btn"><i class="icon-search"></i></button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="status__content">
          <table class="table status__table">
            <tbody class="table-body">
              <tr class="table-row">
                <td class="table-cell">BOCHERER (Wuhan Bocherer Trading Co.,ltd / Hubei Beyoung Garment Co.,ltd )</td>
                <td class="table-cell">
                  <div class="status-numbers">
                    <div class="bg-green status-number">67</div>
                    <div class="bg-red status-number">167</div>
                  </div>
                </td>
              </tr>
              <tr class="table-row">
                <td class="table-cell">BOCHERER (Wuhan Bocherer Trading Co.,ltd / Hubei Beyoung Garment Co.,ltd )</td>
                <td class="table-cell">
                  <div class="status-numbers">
                    <div class="bg-green status-number">67</div>
                    <div class="bg-red status-number">167</div>
                  </div>
                </td>
              </tr>
              <tr class="table-row">
                <td class="table-cell">BOCHERER (Wuhan Bocherer Trading Co.,ltd / Hubei Beyoung Garment Co.,ltd )</td>
                <td class="table-cell">
                  <div class="status-numbers">
                    <div class="bg-green status-number">67</div>
                    <div class="bg-red status-number">167</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
