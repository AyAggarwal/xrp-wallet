import React, {Component} from "react"

const axios = require('axios')

class wallet extends Component {
    constructor() {
        super()
        this.state = {
            address: "r465pZJwxqF5m1zXkob7KakodLovtcoBJ8",
            secret: "saGrUaJjznq4t9NbDQErSJZoPWUnP",
            Bearer_key: "d9c056421fa594304a2b0ef4d84775c9",
            destination_address: "",
            sendAmount: "",
            sendMessage: "",
            sendTX: ""
        }
        
        this.handleClickBalance = this.handleClickBalance.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClickSend = this.handleClickSend.bind(this)
        this.handleClickTest = this.handleClickTest.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async componentWillMount() {
        //change state here so it renders
        console.log(localStorage.getItem('address'))
        this.getBalance()
    }

    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClickBalance(e) {
        e.preventDefault();

        if (this.state.address === null) {
            alert("Enter an Address")
        }

        this.getBalance();
        
    }

    getBalance() {
        let path = "http://localhost:3000/v1/accounts/" + this.state.address + "/info"
        let frame = this
        let bal = 0
        axios.get(path)
        .then(function (response) {
            console.log(response)
            bal = (response.data.account_data.Balance / 10**6) //drops -> xrp conversion
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

    handleClickSend(e) {
        e.preventDefault();
        let path = "http://localhost:3000/v1/payments"

        let frame = this
        let paymentsPayload = {
            payment: {
                source_address: frame.state.address,
                source_amount: {
                    value: frame.state.sendAmount,
                    currency: "XRP"
                },
                destination_address: frame.state.destination_address,
                destination_amount: {
                    value: frame.state.sendAmount,
                    currency: "XRP"
                }
            },
            submit: true
        }
        
        var config = {
            headers: {Authorization: "Bearer " + this.state.Bearer_key }
        }

        console.log(config.headers.Authorization)

        axios.post(path, paymentsPayload, config)
        .then(function (response) {
            console.log(response)
            if (response.data.engine_result === "tesSUCCESS"){
                frame.setState({
                    sendMessage: "Sucess! " + frame.state.value + " XRP has been sent to " + frame.state.destination_address + ". Transaction ID:",
                    sendTX: response.data.tx_json.hash
                })
            }
            frame.getBalance(); 
        })
        .catch(function (error) {
            alert(error)
            console.log(error.response)
        })
    }

    handleClickTest(e) {
        e.preventDefault();
        console.log(this.state.address)
    }
    

    

    render() {
        
        return (
            <form>
                <h1>XRP API DEMO</h1>
                <br />
                <h2>Your XRPL Addy: {this.state.address}</h2>
                <br />
                
                <h3>Live Balance: {this.state.balance}</h3>
        
                <button onClick={this.handleClickBalance}>Update Balance</button>
                <div></div>
                <br />
                <h2>To Send XRP, Enter The Following</h2>
                <input type="text" name="destination_address" placeholder="Destination Account" onChange={this.handleChange} />
                <br />
                <input type="text" name="sendAmount" placeholder="Amount" onChange={this.handleChange} />
                <br />
                <button onClick={this.handleClickSend}>$$$Transact$$$</button>
                <br />
                <h3>{this.state.sendMessage}</h3> 
                <h3>{this.state.sendTX}</h3>
                <button onClick={this.handleClickTest}>TEST BUTTON</button>
            </form>
        )
    }

}

export default wallet
