import React,{Component} from 'react';
import styled from 'styled-components';

const Avatar = styled.div`
  backgroundImage: url(${props => props.url});
`;

class ToUserPreview extends Component{
  render(){
    return(
      <div className="editable-addressee" key={this.props.user.id}>
        <Avatar className="editable-addressee__avatar" url="http://yandex.ru" />
        <div className="editable-addressee__details">
          <div className="editable-addressee__title">{this.props.user.name}</div>
          <div className="editable-addressee__mail">{this.props.user.email}</div>
        </div>
      </div>
    )
  }
}

export default ToUserPreview;