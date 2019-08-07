import React, { Component } from "react";
const axios = require('axios')


class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupName: "",
      destTag: "",
      username: "",
      password: "",
      showMenu: false,
      errors: {}
    };

    
    this.sleep = this.sleep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.loginWallet = this.loginWallet.bind(this);
  }


  componentWillMount(){
    localStorage.clear();
  }
  //dropdown menu functions
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  loginWallet(event) {
    event.preventDefault();
    localStorage.clear();
    localStorage.setItem("username", this.state.username)
    this.props.history.push("/wallet")
  }

  singup(event) {
    event.preventDefault();

  }

  //utility functions
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
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
        <h1>$XRP QuickWallet</h1>
        <h2>Login</h2>
        <div>

        
        
          <input type="text" name="username" placeholder="User" onChange={this.handleChange} />
          <button onClick = {this.loginWallet}>Login</button>
           
        </div>
        <div>
          <h2>Signup</h2>
          <input type="text" name="destTag" placeholder="Destination Tag" onChange={this.handleChange} />
          <br/>
          <input type="text" name="signupName" placeholder="Username" onChange={this.handleChange} />
        </div>
        
      </div>
      
    );
  }
}
export default login
