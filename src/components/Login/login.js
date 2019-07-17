import React, {Component} from "react"

class login extends Component {
    constructor() {
        super()
        this.state = {
            address: "",
            secret: "",
            key: ""
        }
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form>
                <input type="text" name="address" placeholder="Address" onChange={this.handleChange} />
                <br />
                <input type="text" name="secret" placeholder="Secret" onChange={this.handleChange} />
                <h1>{this.state.address} {this.state.secret}</h1>
            </form>
        )
    }

}

export default login
