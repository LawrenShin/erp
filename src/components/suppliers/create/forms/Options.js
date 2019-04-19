import React, {Component} from 'react';

import styles from '../../../../css/suppliers/create/forms/options.module.css';

class Options extends Component{
  state = { selected: false };

  handleClick = (a, b) => {
    if(this.props.setName === 'Status' || this.props.setName === 'Type') {
      const name = this.props.setName, value = a.value;
      this.setState({ selected: value });
      this.props.localSave('e', { name: name.replace(name[0], name[0].toLowerCase()), value })
    }else{
      const name = a, id = b;
      this.setState({ selected: id });
      this.props.localSave('e', { name, value: id });
    }
  }

  componentDidMount(){
    this.setState({ selected: this.props.selectedOptions });
  }

  render(){
    let isCategories = false; 
    switch(this.props.setName){
      case 'Categories':
        isCategories = true;break;
      case 'Genders':
        isCategories = true;break;
      case 'Ages':
        isCategories = true;break;
    }
    const containerStyle = isCategories ? styles['container-options-step'] : styles.container;
    const optionStyle = isCategories ? styles['option-options-step'] : styles.option;
    const selectedStyle = isCategories ? styles['selected-options-step'] : styles.selected;
    const unselectedStyle = isCategories ? styles['unselected-options-step'] : styles.unselected;
    return(
      <div className={containerStyle}>
        <React.Fragment>
          {this.props.list.map((category) => {
          if(this.props.setName === 'Categories'){
            return (
              <div 
              onClick={() => this.handleClick("selectedCategories", category.id)}
              className={[optionStyle, this.props.selectedCategories.indexOf(category.id) > -1 ? selectedStyle : unselectedStyle].join(' ')} 
              key={category.name}>
                {category.name}
              </div>
            );
          }else if(this.props.setName === 'Genders') {
            return (
              <div 
              onClick={() => this.handleClick("selectedGenders", category.id)}
              className={[optionStyle, this.props.selectedGenders.indexOf(category.id) > -1 ? selectedStyle : unselectedStyle].join(' ')} 
              key={category.name}>
                {category.name}
              </div>
            );
           }else if(this.props.setName === 'Ages') {
            return (
              <div 
              onClick={() => this.handleClick("selectedAges", category.id)}
              className={[optionStyle, this.props.selectedAges.indexOf(category.id) > -1 ? selectedStyle : unselectedStyle].join(' ')} 
              key={category.name}>
                {category.name}
              </div>
            );
           }
           let beenSelected = false;
           if(this.state.selected === category.value || this.props.selected === category.value) beenSelected = true;
           return (
             <div 
             onClick={() => this.handleClick(category)}
             className={[styles.option, beenSelected ? styles.selected : styles.unselected].join(' ')} 
              key={category.value}>
                {category.name}
              </div>
            );
          })}
        </React.Fragment>
      </div>
    );
  }
}

export default (Options);