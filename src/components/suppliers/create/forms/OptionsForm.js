import React, {PureComponent} from 'react';

import Options from '../../../controls/options-multi';
import DeliveryTerms from './DeliveryTerms.js';
import StepControls from '../../../StepControls.js';
import Supplier from '../../../../requestor/supplier';

import styles from '../../../../css/suppliers/create/forms/forms.module.css';
import OptionsFormStyles from '../../../../css/suppliers/create/forms/optionsForm.module.css';

class OptionsForm extends PureComponent {
    state = {
        Categories: '',
        Genders: '',
        Ages: '',
        categories: this.props.options_info.categories || [],
        genders: this.props.options_info.genders || [],
        ages: this.props.options_info.ages || [],
        incoterm: null,
        port: null,
    };

    localSave = ({ name, value }) => {
        switch (name) {
            case 'categories':
            case 'genders':
            case 'ages':
                const arr = this.state[name]
                let newArr = []
                for(let v of value){
                    if(arr.indexOf(value[v]) === -1){
                        newArr.push(v)
                    }
                }
                this.setState({ [name]: newArr }, () => this.proceed(0));
                break;
            case 'incoterm':
                this.setState({ incoterm: value }, () => this.proceed(0))
                break;
            case 'port':
                this.setState({ port: value }, () => this.proceed(0))
                break
            default:
                break;
        }
    };

    handleClick = (a, b) => {
        if (this.props.setName === 'Status' || this.props.setName === 'Type') {
            const name = this.props.setName, value = a.value;
            this.setState({selected: value});
            this.props.localSave('e', {name: name.replace(name[0], name[0].toLowerCase()), value})
        } else {
            const name = a, id = b;
            this.setState({selected: id});
            this.props.localSave('e', {name, value: id});
        }
    }

    proceed = (step = 1) => {
        const state = this.state;
        let info = {};
        if (state.categories) info.categories = state.categories;
        if (state.genders) info.genders = state.genders;
        if (state.ages) info.ages = state.ages;
        if (state.incoterm) info.incoterm = state.incoterm;
        if (state.port) info.port = state.port;

        this.props.saveStepInfo({...info}, 'options', step);
    }

    componentDidMount() {
        const promiseAllOptions = Supplier.getAllOptions();
        promiseAllOptions.then((res) => {
            this.setState({
                Ages: res[0].results.map(({id, name}) => ({value: id, name})),
                Genders: res[1].results.map(({id, name}) => ({value: id, name})),
                Categories: res[2].results.map(({id, name}) => ({value: id, name}))
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const state = this.state;
        if (state.Categories || state.Ages || state.Genders) {
            return (
                <div className="bg-box box-supplier">
                    <form>
                        <div className="options">
                            <div className="options__col">
                                <Options
                                    readOnly={this.props.readOnly}
                                    required='required'
                                    label='Categories'
                                    name='categories'
                                    list={this.state.Categories}
                                    value={this.props.options_info && this.props.options_info.categories}
                                    onChange={this.localSave}/>
                            </div>

                            <div className="options__col">
                                <Options
                                    readOnly={this.props.readOnly}
                                    required='required'
                                    name='genders'
                                    label='Genders'
                                    list={this.state.Genders}
                                    value={this.props.options_info && this.props.options_info.genders}
                                    onChange={this.localSave}/>

                                <Options
                                    readOnly={this.props.readOnly}
                                    required='required'
                                    multi
                                    name='ages'
                                    label='Ages'
                                    list={this.state.Ages}
                                    value={this.props.options_info && this.props.options_info.ages}
                                    onChange={this.localSave}/>
                            </div>
                        </div>
                        <DeliveryTerms 
                            defaultValues={this.props.defaultValues}
                            editMode={this.props.editMode} 
                            supplier={this.props.supplier} 
                            readOnly={this.props.readOnly} 
                            localSave={this.localSave}  />
                    </form>
                </div>
            );
        } else {
            return (
                null
            );
        }
    }
}

export default OptionsForm;