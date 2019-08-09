import React, { Component } from "react"
import "../Wallet/wallet.css"
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
            sendTX: "",
            username: "",
            balance: "",
            sendDestTag: "",
            userDestTag: "",
            dbUser: "",
            currentBal: ""
        }

        this.handleClickBalance = this.handleClickBalance.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClickSend = this.handleClickSend.bind(this)
        this.handleClickLogout = this.handleClickLogout.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
        this.queryBalance = this.queryBalance.bind(this)



        var timer = setInterval(this.queryBalance, 5000)
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    componentWillMount() {
        //change state here so it renders
        this.setState({
            username: localStorage.getItem('username'),
            balance: localStorage.getItem('balance'),
            userDestTag: localStorage.getItem('destTag')
        });
    }


    /*
    Happens every 5 seconds. Hits the transactions endpoint, and if the returned transactions array has increased
    in length, then it will scan the latest transaction and deposit money into the respective account (see updateDB())
    */
    async queryBalance() {
        try {
            console.log("working")
            let transactions_path = "http://localhost:3000/v1/accounts/r465pZJwxqF5m1zXkob7KakodLovtcoBJ8/transactions"
            let db_path = "http://localhost:4000/counter"
            let userBal = parseInt(this.state.balance)
            let tx_history_length = 0
            let frame = this

            //get counter from db
            axios.get(db_path)
                .then(function (response) {
                    tx_history_length = parseInt(response.data.amount)
                })
                .catch(function (error) {
                    console.log(error)
                })

            //query transactions
            axios.get(transactions_path)
                .then(async function (response) {
                    try {
                        if (response.data.transactions.length > tx_history_length) {
                            console.log("DOINSOMIN'")
                            let balChange = parseInt(response.data.transactions[0].outcome.balanceChanges.r465pZJwxqF5m1zXkob7KakodLovtcoBJ8[0].value)
                            var destinationTag
                            if (balChange >= 0) {
                                destinationTag = response.data.transactions[0].specification.destination.tag.toString()
                            } else {
                                destinationTag = frame.state.userDestTag
                            }
                            console.log(response.data.transactions[0])
                            //update db
                            frame.updateDB(tx_history_length, destinationTag, balChange)

                            //if latest transaction has tag for current user, update state

                            if (destinationTag === frame.state.userDestTag) {
                                if (response.data.transactions.length !== tx_history_length) {
                                    frame.setState({
                                        balance: (userBal + balChange).toString()
                                    })
                                }
                                //console.log(tx_history_length)
                                console.log(response.data.transactions.length)
                                console.log(frame.state.balance)
                            }
                        }
                    } catch (error) {
                        console.log(error)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })

        } catch (error) {
            console.log(error)
        }

    }

    //if new transaction, updates db counter and balance
    async updateDB(dbindex, destination_tag, balanceChange) {
        console.log(dbindex)
        console.log(destination_tag)
        console.log(balanceChange)
        try {
            console.log("updating db")
            //update counter
            axios.post("http://localhost:4000/counter", {
                amount: (dbindex + 1).toString()
            }).catch(function (error) {
                console.log(error)
            })

            //update user balance
            axios.get("http://localhost:4000/tag/" + destination_tag)
                .then(function (response) {
                    console.log(response)
                    axios.post("http://localhost:4000/user", {
                        username: response.data.username,
                        destTag: destination_tag,
                        balance: (parseInt(response.data.balance) + balanceChange).toString()
                    }).catch(function (error) {
                        console.log(error)
                    })
                }).catch(function (error) {
                    console.log(error)
                })




        } catch (error) {
            console.log(error)
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClickBalance(e) {
        e.preventDefault();

        //for testing
        if (this.state.address === null) {
            alert("no Address")
        }
    }

    //sends payment 
    handleClickSend(e) {
        e.preventDefault();
        let path = "http://localhost:3000/v1/payments"

        let frame = this
        let tag = parseInt(this.state.sendDestTag)

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
                },
                destination_tag: tag
            },
            submit: true
        }

        var config = {
            headers: { Authorization: "Bearer " + this.state.Bearer_key }
        }

        console.log(config.headers.Authorization)

        axios.post(path, paymentsPayload, config)
            .then(function (response) {
                console.log(response)
                if (response.data.engine_result === "tesSUCCESS") {
                    frame.setState({
                        sendMessage: "Sucess! " + frame.state.value + " XRP has been sent to " + frame.state.destination_address + ". Transaction ID:",
                        sendTX: response.data.tx_json.hash
                    })
                }
            })
            .catch(function (error) {
                alert(error)
                console.log(error.response)
            })
    }

    handleClickLogout(e) {
        e.preventDefault();
        localStorage.clear();
        this.props.history.push("/")
    }

    render() {

        return (
            <form>
                <h1>XRP QuickWallet</h1>
                <br />
                <h2>User: {this.state.username}</h2>
                <br />
                <h3 className = "balance">Live Balance: {this.state.balance}</h3>
                
                <div></div>
                <br />
                <h2>To Send XRP, Enter The Following</h2>
                <input className = "text" type="text" name="destination_address" placeholder="Destination Account" onChange={this.handleChange} />
                <br />
                <input className = "text" type="text" name="sendAmount" placeholder="Amount" onChange={this.handleChange} />
                <br />
                <input className = "text" type="text" name="sendDestTag" placeholder="Destination Tag" onChange={this.handleChange} />
                <br />
                <br />
                <button className = "transact" onClick={this.handleClickSend}>$$$Transact$$$</button>
                <br />
                <h3>{this.state.sendMessage}</h3>
                <h3>{this.state.sendTX}</h3>
                <button className = "logout" onClick={this.handleClickLogout}>LOGOUT</button>
            </form>
        )
    }
}

export default wallet
