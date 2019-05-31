import React, {Component} from 'react'
import {Modal} from 'semantic-ui-react'

class ModalSemantic extends Component {
    render() {
        return (
            <Modal
                size={this.props.size}
                onClose={this.props.onClose}
                closeIcon
                trigger={this.props.trigger}>
                {this.props.children}
            </Modal>
        )
    }
}

export default ModalSemantic