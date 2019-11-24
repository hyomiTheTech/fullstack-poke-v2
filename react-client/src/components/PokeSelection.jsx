import React from 'react';
import axios from 'axios';
import PokeSelectionEntry from './PokeSelectionEntry.jsx';

// implement a stateful component where axios get method would be created within it self.

/* 
when I select the type option, I should able to see the pokemons that has the type
1. create a get request to the server
2. the helper function in the server querys to the data base about the type.
3. the helper function has to be engineered in a way the grabs all the pokemons belongs to the type.

*/
class PokeSelection extends React.Component {
    constructor() {
        super()
        this.state = {
            buttonClicked: false,
            types: []
        }
    }

    typeHandler() {
        axios.get('/api/pokemonType').then((response) => {
            this.setState({
                buttonClicked: !this.state.buttonClicked,
                types: response.data
            })
            console.log(this.state.types)
        })
    }

    render() {
        if (this.state.buttonClicked === false) {
            return (
                <div className="Selection">
                    <button onClick={() => { this.typeHandler() }}>Pokemon Type</button>
                </div>
            )
        } else {
            return (
                <select onChange={(e) => { this.props.getByType(e.target.value) }}>
                    {this.state.types.map((type, i) => (
                        <PokeSelectionEntry getByType={this.props.getByType} type={type} key={i} />
                    ))}
                </select>
            )
        }
    }
}

export default PokeSelection;

