import React,{Component} from 'react';

class Status extends Component{

  render(){
    return(
      <div className="status">
        <div className="status__head">
            <div className="status-title">{this.props.title}</div>
            <div className="status-search">
                <form action="#">
                    <div className="status-search__content">
                        <div className="search-bl">
                            <input type="text" className="search-bl__input" />
                            <button type="submit" className="search-bl__btn"><i className="icon-search"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className="status__content">
            <table className="table status__table">
                <tbody className="table-body">
                    <tr className="table-row">
                        <td className="table-cell">BOCHERER (Wuhan Bocherer Trading Co.,ltd / Hubei Beyoung Garment Co.,ltd )</td>
                        <td className="table-cell">
                            <div className="status-numbers">
                                <div className="bg-green status-number">67</div>
                                <div className="bg-red status-number">167</div>
                                <div className="bg-yellow status-number">7</div>
                            </div>
                        </td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-cell">BOCHERER (Wuhan Bocherer Trading Co.,ltd / Hubei Beyoung Garment Co.,ltd )</td>
                        <td className="table-cell">
                            <div className="status-numbers">
                                <div className="bg-green status-number">67</div>
                                <div className="bg-red status-number">167</div>
                                <div className="bg-yellow status-number">7</div>
                            </div>
                        </td>
                    </tr>
                    <tr className="table-row">
                      <td className="table-cell">BOCHERER (Wuhan Bocherer Trading Co.,ltd / Hubei Beyoung Garment Co.,ltd )</td>
                      <td className="table-cell">
                        <div className="status-numbers">
                          <div className="bg-green status-number">67</div>
                          <div className="bg-red status-number">167</div>
                          <div className="bg-yellow status-number">7</div>
                        </div>
                      </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    )
  }
}

export default Status;