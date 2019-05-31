import React, {Component} from 'react';
import uuid from 'uuid';
import Dropdown from '../controls/dropdown';
import QuotationInput from './QuotationInput';


class QuotationListFilter extends Component {
    state = { lastFocus: false }

    getHeight = () => {
        const height = document.body.clientHeight - this.ref.current.getBoundingClientRect().bottom - 120;
        return height > 600 ? height : 600;
    };

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
    };
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    };

    filterNameTransformer = (filterName, type) => {
        if (type === 'fromBack') return filterName.replace(filterName[0], filterName[0].toUpperCase()).replace(/_/g, ' ');
        if (type === 'toBack') return filterName.replace(filterName[0], filterName[0].toLowerCase()).replace(/ /g, '_');
    };

    handleClickClearAll = () => {
        this.props.clearAll();
    };

    handleChange = ({ name, value, elId }) => {
        this.setState({ lastFocus: elId })
        this.props.updateOptions(this.filterNameTransformer(name, 'toBack'), value);
    };

    renderDropdown = (name, filter) => {
        const {options} = this.props;
        const placeholder = this.filterNameTransformer(name, 'fromBack');

        return (
            <Dropdown
                key={uuid()}
                name={name}
                placeholder={placeholder}
                options={filter.extra}
                value={options[name]}
                onChange={this.handleChange}/>
        )
    };

    renderInput = (name, filter) => {
        const { options } = this.props;
        const placeholder = this.filterNameTransformer(name, 'fromBack');
        const { lastFocus } = this.state

        return (
            <QuotationInput
                key={uuid()}
                focus={lastFocus === `_last_focus_${name}` ? true : false}
                name={name}
                placeholder={placeholder}
                value={options[name]}
                onChange={this.handleChange}/>
        )
    };

    filtersTypeSplitter = (filters) => {
        let dropdowns = [], inputs = [], dataSchrodinger = false;
        if('data' in filters) dataSchrodinger = true;

        Object.entries( dataSchrodinger ? filters.data : filters ).forEach(entry => {
            if ('extra' in entry[1]) {
                dropdowns = [...dropdowns, entry]
            } else {
                inputs = [...inputs, entry]
            }
        })
        return {dropdowns, inputs}
    }

    render() {
        const {filters} = this.props
        const splitted = this.filtersTypeSplitter(filters)
        return (
            <div className='quotation-filters' ref={this.ref}>
                <div className="filters-header">
                    <span className="filters-header__title">Filters</span>
                    <button type="reset" className="filters-header__reset" onClick={this.handleClickClearAll}>Clear all<i className="icon-trash"></i></button>
                </div>

                <div className="filters-box filters-box-without-decor">
                    { splitted.dropdowns.map(d => this.renderDropdown(d[0], d[1])) }
                    { splitted.inputs.map(d => this.renderInput(d[0], d[1])) }

                    {/* Поиск в фильтрах */}
                    {this.props.search ? <div className="filters-box__item" style={{marginLeft: 'auto', minWidth: '35%'}}>
                        <div className="filters-elem">
                            <div className="search-bl">
                                <input className="search-bl__input" type="text"/>
                                <button className="search-bl__btn"><i className="icon-search"></i></button>
                            </div>
                        </div>
                    </div> : ''}

                </div>
            </div>
        );
    }
}

export default QuotationListFilter;