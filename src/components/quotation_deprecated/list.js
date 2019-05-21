import React from 'react';
import {NavLink} from 'react-router-dom';
import AddBtn from '../controls/addbtn';
import Dropdown from '../controls/dropdown';
import Input from '../controls/input';
import Table from '../common/table';
import {connect} from 'react-redux';
import {createRequestAction} from '../../actions';
import Loading from '../helpers/loading';

class Quotations extends React.Component {

    fields = {
        "id": "Id",
        "name": "Name",
        "start_at": "Start at",
        "finish_at": "Finish at",
        "status": "Status",
        "type": "Type",
        "get_total_items": "Total Items",
        "product_amount": "Product Amount",
        "supplier_amount": "Supplier Amount",
        "collection": "Collection",
        "stage_1_status": "Stage 1 Status",
        "stage_2_status": "Stage 2 Status",
        "stage_3_status": "Stage 3 Status",
        "result": "Result",
        "result_currency": "Result Currency"
    };

    componentDidMount() {
        this.props.getData();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <>
                <div className="page-heading">
                    <div className="page-heading__title">
                        <div className="page-heading__top">
                            <h1 className={`h1`}>Quotations</h1>
                            <AddBtn to={"/quotations/create"} />
                        </div>
                        <h2 className={"page-subtitle"}>List of current quotations</h2>
                    </div>
                </div>

                <form>
                    <div className="quotation-filters" ref={this.ref}>
                        <div className="filters-header">
                            <span className="filters-header__title">Filters</span>
                            <button type="reset" className="filters-header__reset">Clear all<i className="icon-trash"></i></button>
                        </div>
                        
                        <div className="filters-box filters-box-without-decor">
                            
                            <div class="filters-box__item">
                                <div class="input-elem">
                                    <input type="text" placeholder="Name" class="filters-input" />
                                </div>
                            </div>

                            <Dropdown label="Collection" name="collection" options={[{text: "Collection #1", value: "1"}, {text: "Collection #2", value: "2"}]} />
                            
                            <div className="filters-box__item" style={{marginLeft: "auto", minWidth: "33%"}}>
                                <div className="filters-elem">
                                    <div className="search-bl">
                                        <input type="text" className="search-bl__input"/>
                                        <button type="submit" className="search-bl__btn"><i className="icon-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>	

                {this.props.list.state === "loaded" ?
                    <Table header={title => <span><i className="icon-arrow-dowble"></i>{title}</span>} fixed={2} data={this.props.list.data} fields={this.fields}/>
                :
                    <Loading />
                }                
            </>
        )
    }
}

export default connect( (state) => ({
    list: state.quotations.list
}), (dispatch) => ({
    getData: () => dispatch(createRequestAction("quotation", "list"))
}))(Quotations);