import React, {Component} from 'react';
import _ from 'lodash';
import {NavLink} from 'react-router-dom';
import {Message} from 'semantic-ui-react';
import Loading from '../helpers/loading';
import Table from '../common/table';
import Product from '../../requestor/product';
import connectApi from '../api-wrapper';
import {combineOptions} from '../../selectors/options';
import Order from '../common/order';
import styled from "styled-components";
import InnerRow from './InnerRow'

class ExpandComponent extends React.PureComponent {
    static defaultProps = {
        onClick: () => {
        }
    }
    onClick = () => {
        this.props.onClick();
    }

    render() {
        const {className, ...rest} = this.props;
        return <div className={`${className}`} {...rest} onClick={this.onClick}><i className="icon-arrow-down"></i>
        </div>
    }
}

const Expand = styled(ExpandComponent)`
    color: #40bde8;
    cursor: pointer;
    margin-right: 30%;
    transform: rotateZ(-90deg);
    transition: 0.3s linear;

    ${({active}) => active && `transform: rotateZ(0);`}
`;

class DynamicTable extends Component {

    fields = {
        id: "Id",
        name: "Name",
        trade_mark: 'Trade mark',
        theme: "Theme",
        year: "Year",
        department: "Department",
        vendor_code: "Article",
        category: "Category",
        color: "Color",
        gender: "Gender",
        age: "Age"
    };

    state = {
        list: [],
        cities: {},
        countries: {},
        rowIndex: -1,
        loading: false,
        errors: null,
        preload: false
    };

    constructor(props) {
        super(props);
    }

    backY = 0;
    backX = 0;
    offset = 0;
    count = 0;

    onScroll = async ({valueY, valueX, height}) => {
        try {
            const {products} = this.props.store;
            const combinedOpt = combineOptions(this.props.store, 'products');
            if (this.state.loading)
                return;
            if (valueY / height > 0.9 && valueY > this.backY && this.offset + combinedOpt.limit > this.count) {
                this.setState({preload: true});
                (async () => {
                    this.offset += combinedOpt.limit;
                    const data = await Product.list({
                        ...combinedOpt,
                        offset: this.offset
                    }).then(data => data.results);
                    this.setState(({list}) => ({list: list.concat(data), preload: false}));
                })()
            }
        } catch (e) {
            console.log(e);
        }
        this.backY = valueY;
    };

    async onChange(props, prevProps) {
        const combinedOpt = combineOptions(props.store, 'products'),
            prevCombinedOpt = combineOptions(prevProps.store, 'products'),
            isEqual = _.isEqual(combinedOpt, prevCombinedOpt),
            {getApi} = this.props;

        if (!isEqual) {
            this.setState({options: combinedOpt, loading: true}, async () => {
                const products = await getApi("product").run("list", this.state.options);

                this.setState({
                    list: products.results,
                    loading: false
                });
            });
        }
    }

    async componentDidMount() {
        const {getApi} = this.props;

        try {
            this.setState({loading: true});

            const list = await getApi('product').run('list', combineOptions(this.props.store))

            this.setState({
                list: list.results,
                loading: false
            });
        } catch (e) {
            console.log(e);
            this.setState({errors: 'Could not get list'});
        }
    }

    componentDidUpdate(prevProps) {
        this.onChange(this.props, prevProps);
    }

    finder = (heap, needle) => {
        const match = heap.filter(h => h.value === needle)[0];
        if (match && 'text' in match) return match.text;
        return null
    };

    render() {
        if (!this.state.loading) {
            return (
                <div style={{position: "relative"}}>
                    {this.state.errors && <Message color='red'>{this.state.errors}</Message>}
                    <Table
                        rowAfter={(row, id) => {
                            if (row === this.state.rowIndex) {
                                return <InnerRow
                                    filters={this.props.filters}
                                    row={row}
                                    value={this.state.list}
                                />
                            } else if (row === this.state.backRowIndex) {
                                return <InnerRow
                                    filters={this.props.filters}
                                    id={id}
                                    row={row}
                                    value={this.state.list}
                                    collapse
                                />
                            } else
                                return null;
                        }}
                        fields={this.fields}
                        data={this.state.list.length === 0 ? 'No items were found' : this.state.list}
                        cell={(value, name, row) => name === "id" ?
                            <div className='-flex'><Expand active={row === this.state.rowIndex} onClick={() => {
                                this.setState(({rowIndex}) => rowIndex === row ? ({
                                    rowIndex: -1,
                                    backRowIndex: row,
                                    list: Array.from(this.state.list)
                                }) : ({backRowIndex: rowIndex, rowIndex: row, list: Array.from(this.state.list)}))
                            }}/>
                            <NavLink to={`/products/view/${value}`}>{value}</NavLink>
                            </div> : value}
                        header={(name, title) => <Order name={title} title={name}/>}
                        fixed={2} height={600} onScroll={this.onScroll}/>
                    {this.state.preload ? <Loading
                        style={{position: "absolute", left: "45%", top: "45%", display: "inline-block"}}/> : ''}
                </div>
            );
        } else {
            return <Loading style={{position: "absolute", left: "45%", top: "45%", display: "inline-block"}}/>;
        }
    }
};

export default connectApi(DynamicTable);