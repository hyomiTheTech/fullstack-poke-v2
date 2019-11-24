import React from 'react';
import PokeListEntry from './PokeListEntry.jsx';

const PokeList = (props) => (
  <div>
    {props.lists.map((poke, i) => (
      <PokeListEntry get={props.get} list={poke} key={i} detail={props.detail} />
    ))}
  </div>
)

export default PokeList;