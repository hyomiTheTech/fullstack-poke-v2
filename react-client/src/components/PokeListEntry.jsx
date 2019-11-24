import React from 'react';
import axios from 'axios';

class PokeListEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            change: false
        }
    }

    postNameHandler(id) {
        console.log(id)
        axios.put(`/api/updatePokemon/${id}`, {
            name: this.state.name
        })
    }

    deletePokemonHandler(id) {
        axios.delete(`/api/deletePokemon/${id}`).then(() => {
            this.props.get()
        })
    }

    inputChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.name)
    }

    formChangeHandler() {
        this.setState({
            change: !this.state.change
        })
    }

    // when I click the change name button I should able to change the button

    render() {
        if (this.state.change === false) {
            return (
                <div>
                    <div onClick={() => { this.formChangeHandler() }}>Name: {this.props.list.name}</div>
                    <div>Type: {this.props.list.typeName}</div>
                    <div><img src={this.props.list.image_url} /></div>
                    <button onClick={() => { console.log(this.props.list); this.props.detail(this.props.list) }} >Show detail</button>
                    <button onClick={() => { this.deletePokemonHandler(this.props.list.id) }}>Delete Pokemon</button>
                </div >
            )
        } else if (this.state.change === true) {
            return (
                <div>
                    <form>
                        Change Name: <input type="text" name="name" onChange={(e) => { this.inputChangeHandler(e) }} />
                        <input type="submit" value="Submit" onClick={() => { this.postNameHandler(this.props.list.id) }} />
                    </form>
                    <div>Type: {this.props.list.typeName}</div>
                    <div><img src={this.props.list.image_url} /></div>
                </div>
            )
        }

    }
}


export default PokeListEntry;