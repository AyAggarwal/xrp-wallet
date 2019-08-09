import React, { Component } from "react";
import "../Login/login.css"
const axios = require('axios')


class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupName: "",
      destTag: "",
      username: "",
      showMenu: false,
      errors: {}
    };

    
    this.sleep = this.sleep.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.loginWallet = this.loginWallet.bind(this);
    this.signup = this.singup.bind(this)
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
    if (this.state.username === "Admin") {
      this.props.history.push("/admin")
      return
    }
    //get user
    let path = "http://localhost:4000/user/" + this.state.username
    let frame = this

    axios.get(path)
    .then(function (response) {
      localStorage.setItem("balance", response.data.balance)
      localStorage.setItem("destTag", response.data.destTag)
      localStorage.setItem("username", frame.state.username)
      console.log(response)
      frame.props.history.push("/wallet")
    })
    .catch(function (error) {
      alert("Invalid User")
    })   
  }

  singup(event) {
    event.preventDefault();
    let path = "http://localhost:4000/user/"
    let frame = this

    //post user
    axios.post(path, {
      username: frame.state.signupName,
      destTag: frame.state.destTag,
      balance: "100"
    })
    .then(function (response) {
      localStorage.setItem("balance", response.data.balance)
      localStorage.setItem("destTag", response.data.destTag)
      localStorage.setItem("username", response.data.username)
      frame.props.history.push("/wallet")
    })
    .catch(function (error) {
      console.log(error)
    })
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

        
        
          <input className = "text" type="text" name="username" placeholder="User" onChange={this.handleChange} />
          <br/>
          <button className = "button" onClick = {this.loginWallet}>Login</button>
           
        </div>
        <div>
          <h2>Signup</h2>
          <input className = "text" type="text" name="destTag" placeholder="Destination Tag" onChange={this.handleChange} />
          <br/>
          <input className = "text" type="text" name="signupName" placeholder="Username" onChange={this.handleChange} />
          <br/>
          <button className = "button" onClick = {this.signup}>Signup</button>
        </div>
        
      </div>
      
    );
  }
}
export default login
