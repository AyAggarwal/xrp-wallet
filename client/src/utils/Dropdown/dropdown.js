import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Card extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.loginWallet = this.loginWallet.bind(this);
  }
  
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
    localStorage.setItem("username", event.target.name)
    this.state.history.push("/wallet")
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          Show menu
        </button>
        
        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <button name="Will" onClick = {this.loginWallet}> Will </button>
                <br/>
                <button name="Warren" onClick = {this.loginWallet}> Warren </button>
                <br/>
                <button name="Doug" onClick = {this.loginWallet}> Doug </button>
                <br/>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}
export default withRouter(Card)