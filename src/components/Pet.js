import React, { Component } from 'react';
import "./Pet.css"

class Pet extends Component {
  render() {
    const pet = this.props.pet
    return (
      <div className="box">
        <div className="head">
          <h3>{pet.name}</h3>
        </div>
        <div className="body">
          <div><img className="pic" src={pet.picture} alt="" /></div>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Location: {pet.age}</p>
          <p>Adopter: </p>
          <p><button>Adopt</button></p>
        </div>
      </div>
    );
  }
}

export default Pet;
