import React, {Component} from "react";

export default class NotFound extends Component {
    render(){
        this.props.history.push("/");
        return (
            <div/>
        )
    }
}