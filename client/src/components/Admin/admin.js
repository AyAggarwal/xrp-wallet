import React, { Component } from "react"
const axios = require('axios')

class admin extends Component {

    constructor() {
        super()
        this.state = {
            placeholder: "",
            balance: "",
            counter: "",
            address: "r465pZJwxqF5m1zXkob7KakodLovtcoBJ8"
        }

        this.getBalance = this.getBalance.bind(this)
        this.getCounter = this.getCounter.bind(this)
        this.handleClickLogout = this.handleClickLogout.bind(this)
    }

    componentWillMount() {
        this.getBalance()
        this.getCounter()
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

    //check this and manually set "counter" to this number in redis if broken
    getCounter() {
        let transactions_path = "http://localhost:3000/v1/accounts/r465pZJwxqF5m1zXkob7KakodLovtcoBJ8/transactions"
        let frame = this
        axios.get(transactions_path)
        .then(function (response) {
            frame.setState({
                counter: response.data.transactions.length
            })
            
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    handleClickLogout() {
        this.props.history.push("/")
    }

    render() {

        return (
            <div>
                <h1>XRP QuickWallet AdminPage</h1>
                <h2>Total Wallet Balance: {this.state.balance}</h2>
            
                <h2>Total Transaction Volume: {this.state.counter}</h2>
                <button onClick={this.handleClickLogout}>LOGOUT</button>

            </div>
        )
    }

}
export default admin
