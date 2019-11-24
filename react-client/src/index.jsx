import React from "react";
import ReactDOM from "react-dom";
import PokeList from "./components/PokeList.jsx";
import axios from 'axios';
import PokeSelection from './components/PokeSelection.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      detail: false,
      one: {}
    };
    this.detailHandler = this.detailHandler.bind(this)
  }

  componentDidMount() {
    this.getLists()
  }

  getLists() {
    axios.get('/api/pokemon/').then((response) => {
      // console.log(response.data)
      this.setState({
        lists: response.data
      })
    })
  }

  detailHandler(list) {
    this.setState({
      detail: !this.state.detail,
      one: list
    })
  }

  getPokesByType(id) {
    axios.get(`/api/pokemonByType/${id}`).then((response) => {
      console.log(response.data)
      this.setState({
        lists: response.data
      })
    })
  }

  render() {
    if (this.state.detail === false) {
      return (
        <div>
          <h1>Pokemon!</h1>
          <div>
            <PokeSelection getByType={this.getPokesByType.bind(this)} /><button onClick={() => { this.getLists() }} >HOME</button>
          </div>
          <PokeList get={this.getLists.bind(this)} lists={this.state.lists} detail={this.detailHandler} />
        </div>
      );
    } else if (this.state.detail === true) {
      return (
        <div>
          <button onClick={() => {
            this.getLists(); this.setState({
              detail: !this.state.detail
            })
          }} >HOME</button>
          <div >Name: {this.state.one.name}</div>
          <div>Type: {this.state.one.typeName}</div>
          <div><img src={this.state.one.image_url} /></div>
        </div >
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
