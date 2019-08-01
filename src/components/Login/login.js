import React, { Component } from "react";

const axios = require('axios')


class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      secret: "",
      errors: {}
    };

    this.handleClickSignup = this.handleClickSignup.bind(this)
    this.sleep = this.sleep.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


 
  async handleClickSignup(e) {
    try {
      e.preventDefault();

    } catch (error) {
      console.log(error)
    }


  }

  
  async handleClickLogin(e) {
    try {
      e.preventDefault()
      localStorage.clear()
      localStorage.setItem("address", this.state.address)
      localStorage.setItem("secret", this.state.secret)
    } catch (error) {
      console.log(error)
    }


  }

  //Hits testnet faucet and generates testnet account [unused]
  getTestnetCredentials() {
    let path = "https://faucet.altnet.rippletest.net/accounts"
    axios.post(path)
      .then(function (response) {
        console.log(response)
        localStorage.setItem("address", response.data.account.address)
        localStorage.setItem("secret", response.data.account.secret)

      })
      .catch(function (error) {
        console.log(error)
      })
  }


  render() {


    return (
      <div>
        <h1>$XRP Wallet</h1>
        <br />
        <button onClick={this.handleClickSignup}>Signup</button>
        <h2>Login</h2>
        <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
        <br />
        <input type="text" name="password" placeholder="Password" onChange={this.handleChange} />
        <br />
        <button onClick={this.handleClickLogin}>Login</button>
      </div>

    );
  }
}
export default login
