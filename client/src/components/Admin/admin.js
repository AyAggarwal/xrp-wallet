import React, { Component } from "react"
const axios = require('axios')

class admin extends Component {

    constructor() {
        super()
        this.state = {
            placeholder: "",
            balance: "",
            address: "r465pZJwxqF5m1zXkob7KakodLovtcoBJ8"
        }

        this.getBalance = this.getBalance.bind(this)
        this.handleClickLogout = this.handleClickLogout.bind(this)
    }

    componentWillMount() {
        this.getBalance()
    }
    //total wallet funds
    getBalance() {
        let path = "http://localhost:3000/v1/accounts/" + this.state.address + "/info"
        let frame = this
        let bal = 0
        axios.get(path)
            .then(function (response) {
                console.log(response)
                bal = (response.data.account_data.Balance / 10 ** 6) //drops -> xrp conversion
                if (response.data.error) {
                    alert(response.data.error_message)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
            .finally(function () {
                frame.setState({
                    balance: bal
                })
                console.log(frame.state.balance)
            });
    }

    handleClickLogout() {
        this.props.history.push("/")
    }

    render() {

        return (
            <div>
                <h1>XRP QuickWallet AdminPage</h1>
                <h2>Total Wallet Balance: {this.state.balance}</h2>
                <br />
                <button onClick={this.handleClickLogout}>LOGOUT</button>
            </div>
        )
    }

}
export default admin
