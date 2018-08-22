import React, { Component } from 'react';
import "./Pet.css"
import { Button } from 'antd';
import { Card } from 'antd';

class Pet extends Component {
  isSendingRequest

  contracts
  constructor(props){
    super(props)

    this.contracts = props.contracts
    this.isSendingRequest = false
  }

  render() {
    const pet = this.props.pet

    const adopter = this.props.adopters[pet.id]
    const adopterEle =  (!adopter || adopter === "0x0000000000000000000000000000000000000000")
      ? null : <p>Adopter: {shortAddr(adopter)}</p>

    return (
      <div className="box">
        <Card title={pet.name}>
          <div><img className="pic" src={pet.picture} alt="" /></div>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Location: {pet.age}</p>
          {adopterEle}
          <p>
            <Button disabled={this.isSendingRequest || adopterEle} onClick={() => this.handleAdopter(pet.id)}>Adopt</Button>
          </p>
        </Card>
      </div>
    );
  }

  async handleAdopter(petId) {
    this.isSendingRequest = true

    try {
      const instance = await this.contracts.Adoption.deployed();
      const ret = await instance.adopt(petId, {from: "0x0000000000000000000000000000000000000000"});
      console.log("adopt() ", ret)
    } catch(e) {
      console.log(e)
    }

    this.isSendingRequest = false
  }
}
function shortAddr(addr) {
  return addr.substring(0, 12) + "..." + addr.substring(35)
}

export default Pet;
