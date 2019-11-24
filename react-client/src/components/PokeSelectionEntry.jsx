import React from 'react';
import axios from 'axios';

class PokeSelectionEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type.id
        }
    }

    render() {
        return (
            <option value={this.props.type.id}>
                {this.props.type.name}
            </option>
        )
    }
}

export default PokeSelectionEntry;