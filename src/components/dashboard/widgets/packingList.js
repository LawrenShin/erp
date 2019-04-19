import React from 'react';
import _ from 'lodash';
import Loading from '../../helpers/loading';
import Table from '../../common/table';
import {Formik} from 'formik';
import Dropdown from '../../controls/dropdown';
import Order from '../../common/order';
import ConnectApi from '../../api-wrapper';
import {connect} from 'react-redux';
import {combineOptions} from '../../../selectors/options';
import {createAction} from '../../../actions';

const FIELDS = { 
    "supplier_name": 'Supplier', 
    "style_name": 'Style name', 
    "whd_date": 'WHD date', 
    "vessel_date": 'Vessel date', 
    "pl_status": 'PL status', 
    "year": 'Year', 
    "trade_mark": 'Trade mark', 
    "season": 'Season', 
    "theme": 'Theme' 
};

class PackingListDashboardWidget extends React.Component{

    ref = React.createRef();

    state = { 
        tableWidth: 0,
        tableHeight: 0,
        list: [],
        loading: true
    };
    
    timeout = null;

    async componentDidMount() {
        const {getApi} = this.props;

        const list = await getApi('dashboard').run('getPackingList', this.props.options);
        this.setState({ 
            list,
            loading: false
         });
        window.addEventListener("resize", this.onResize);
        try{
            this.onResize();
        }catch(e){
            console.log(e);
        }
    }

    componentDidUpdate(prevProps){
        this.onChange(this.props, prevProps);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    async onChange(props, prevProps){
        const {getApi} = this.props,
        {options} = props,
        prevOptions = prevProps.options,
        isEqual = _.isEqual(options, prevOptions);

        if(!isEqual){
            this.setState({ loading: true }, async () => {
                const list = await getApi('dashboard').run('getPackingList', options);
                this.setState({ list, loading: false });
            });
        }
      }

    getTableHeight = () => {
        const height = document.body.clientHeight - this.ref.current.getBoundingClientRect().bottom - 120;
        return height > 600 ? height : 600;
    }

    onResize = () => {
        this.setState({tableWidth: this.ref.current.clientWidth, tableHeight: this.getTableHeight()});
    }

    changeOptions = (values) => this.props.setOptions(values);
    sortByName = (filterName) => this.props.setFilterName(filterName);

    render(){
        return (
            <div className="packing-list" ref={this.ref}>
                <Formik
                    initialValues={{ search: '', year: '', brand: '', season: '', theme: '', wdh_date: '' }}
                    onSubmit={(values, actions) => {
                        console.log(actions);
                        actions.setSubmitting(false);
                    }}
                    // beware crapcode/antipattern/worstpractices ahead 
                    validate={(values => {
                        delete values.search;
                        this.changeOptions(values);
                        return {};
                    })}
                    validateOnBlur={false}
                    render={({handleSubmit, handleChange, handleBlur, values}) => (<form onSubmit={handleSubmit}>
                    <div className="filters-header">
                            <div className="window-title">
                                <i className="window-title__icon icon-box"></i>
                                packing list
                            </div>
                        </div>
                        
                        <div className="filters-box  packing-list__filters-box">
                            <div className="filters-box__item filters-box__item_search">
                                <div className="search-bl">
                                    <input type="text" name="search" value={values.search} className="search-bl__input" onChange={handleChange}/>
                                    <button type="submit" className="search-bl__btn"><i className="icon-search"></i></button>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <Dropdown simple name="year" value={values.year} label="Year" options={[{text: "2017", value: "2017"}, {text: "2019", value: "2019"}]} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="input-elem">
                                    <input value={values.brand} type="text" name="brand" placeholder="Brand" className="filters-input" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <Dropdown simple value={values.season} name="season" label="Season" options={[{text: "online", value: "af"}, {text: "offline", value: "ax"}]} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <Dropdown simple value={values.theme} name="theme" label="Theme" options={[{text: "online", value: "af"}, {text: "offline", value: "ax"}]} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="filters-box__item">
                                <div className="filters-elem select-elem">
                                    <Dropdown simple value={values.wdh_date} name="wdh_date" label="WDH Date" options={[{text: "online", value: "af"}, {text: "offline", value: "ax"}]} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </form>
                    )}
                    />
                    {!this.state.loading ? 
                    <Table 
                        fixed={1} 
                        fields={FIELDS} 
                        data={this.state.list} 
                        height={600} 
                        header={(name, title) => <Order name={name} title={title} />}
                        />
                    : 
                    <Loading/>
                }
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    options: combineOptions(state, 'dashboard')
});

export default connect(mapStateToProps, (dispatch) => ({
    setOptions: (options) => dispatch(createAction('SET_DASHBOARD_OPTIONS', options)),
    setFilterName: (filterName) => dispatch(createAction('SET_FILTER_NAME', filterName))
}))(ConnectApi(PackingListDashboardWidget));