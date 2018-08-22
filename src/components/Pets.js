import React, { Component } from 'react';
import Pet from './Pet.js';
import './Pets.css';
import Web3Provider from '../Web3RPCProvider';
import TruffleContract from 'truffle-contract'

const AdoptionArtifact  = require('../contracts/Adoption.json')

const pets = require('../pets.json')

class Pets extends Component {
  web3Provider
  contracts = {}

  constructor(props) {
    super(props)
    this.state = {
      adopters: {},
    }
  }

  componentDidMount() {
    this.web3Provider = new Web3Provider()
    this.initContract()
  }

  componentWillUnmount() {
    this.stopFetchAdopters()
  }

  initContract() {
    this.contracts.Adoption = TruffleContract(AdoptionArtifact);

    // Set the provider for our contract
    this.contracts.Adoption.setProvider(this.web3Provider);

    this.startFetchAdopters();
  }

  isFetchingAdopters = false

  async startFetchAdopters() {
    this.isFetchingAdopters = true

    while (this.isFetchingAdopters) {
      console.log("fetchAdopters")
      await this.fetchAdopters()
      await sleep(2000)
    }
  }

  stopFetchAdopters() {
    this.isFetchingAdopters = false
  }

  async fetchAdopters() {
    const instance = await this.contracts.Adoption.deployed();
    const adopters = await instance.getAdopters.call();
    this.setState({ adopters })
    console.log(adopters)
  }

  render() {
    const petsElements = []
    pets.map((pet) => {
      return petsElements.push(<Pet
        key={pet.id}
        pet={pet}
        adopters={this.state.adopters}
        contracts={this.contracts}></Pet>)
    })
    return (
      <div className="container">
        {petsElements}
      </div>
    );
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Pets;
