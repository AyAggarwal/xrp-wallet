import React, { Component } from "react";

const axios = require('axios')


class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleClickCredentials = this.handleClickCredentials.bind(this)
    this.sleep = this.sleep.bind(this)
    
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  async handleClickCredentials(e) {
      try {
        e.preventDefault();
        localStorage.clear()
        await this.getTestnetCredentials()
        await this.sleep(1000)
        this.props.history.push('/wallet')

      } catch (error) {
          console.log(error)
      }
      
    
  }

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
            <button onClick={this.handleClickCredentials}>Generate Key To Success</button>
            <h2>{this.fakeLoadingText}</h2>
        </div>
      
    );
  }
}
export default login
