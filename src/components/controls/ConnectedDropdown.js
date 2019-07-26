import React, {useState, useEffect} from 'react';
import svg from '../../css/svg.module.css'
import uuid from 'uuid';
import {Dropdown} from 'semantic-ui-react'

const irrigateHeader = (name) => `${name[0].toUpperCase()}${name.substr(1).replace("_", " ")}`;

const menuField = (opt, state, valueFromStore, name) => {
    const isActive = (String(state.option) === String(opt.id)) ? 'active' : '';
    return <div
        data-parent={name}
        key={uuid()}
        className={`item ${isActive}`}
        data-option={opt.id}
        onClick={(e) => state.save(e)}>
        {opt.name}
    </div>
};

const ConnectedDropdown = ({name, options, saveToStore, valueFromStore, required, label}) => {
    const [option, setOption] = useState(0);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const selectedOption = options.filter(o => (String(o.id) === String(option)))[0];
    const selectedStore = options.filter(o => (String(o.id) === String(valueFromStore)))[0] || options.filter(o => (String(o.name) === String(valueFromStore)))[0];
    //const newMenuField = [{key: '001', value: null, "data-option": null, text: 'Not selected'}];

    //const newMenuFieldAdd = options.map(opt => newMenuField.push({key: opt.id, value: opt.id, "data-option": opt.id, text: opt.name, active: opt.id === valueFromStore ? true : false, selected: opt.id === valueFromStore ? true : false}));

    const currentName = () => {
        if (selectedOption) {
            return selectedOption.name;
        } else if (selectedStore) {
            return selectedStore.name;
        } else {
            return '';
        }
    };

    const save = (d) => {
        if (d) {
            let strings = ['season', 'year', 'color', 'theme', 'category', 'gender', 'age', 'department'];
            const strng = strings.filter(word => word === name)[0];
            let val = d.target.getAttribute('data-option');
            if (!strng) {
                val = +val;
            }
            saveToStore({name, data: val});
            setOption(val);
        } else {
            saveToStore({name, data: d});
            setOption(d);
        }
    };

    if (name === 'year') {
        valueFromStore = String(valueFromStore);
    }
    
    useEffect(() => {
        const listenerHandler = function(e){
            if(e.target.dataset.name !== name && visibleMenu) setVisibleMenu(false)
        }

        window.addEventListener('click', listenerHandler)
        return function cleanup() {
            window.removeEventListener('click', listenerHandler)
        }
    })

    return (
        <>
            <div className="product-columns__item">
                <div className={`select-elem ${visibleMenu ? '-is-unfolded' : ''}`}>
                    <label className={`box-field__label ${required}`}>{label ? label : irrigateHeader(name)}</label>
                    {/*<Dropdown
                        placeholder=''
                        fluid
                        selection
                        defaultValue={valueFromStore ? valueFromStore : ''}
                        options={newMenuField}
                        onClick={(event, data) => save(event)}
                    />*/}
                    <div
                        className="ui fluid selection dropdown closeme" 
                        onClick={() => setVisibleMenu(!visibleMenu)}>
                        <span className='connected__dropdown__name'>{currentName()}</span>
                        <input type="text"
                               className="select-elem__toggler"
                               disabled
                               data-name={name}
                        />
                        <div className='menu'
                             style={{display: visibleMenu ? 'block' : 'none', zIndex: 9000}}>
                            <div
                                data-option='none'
                                key='not selected'
                                className={`item ${(option === null && !valueFromStore) ? 'active' : ''}`}
                                onClick={(e) => save(null)}>
                                Not selected
                            </div>
                            {options.map(opt => menuField(opt, {option, save}, valueFromStore, name))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConnectedDropdown