import React, {Component} from "react";
import {inject, observer} from 'mobx-react';
import decode from "jwt-decode";
import SingleInput from '../common/single-input/single-input'
import AuthService from '../../services/authservice';
import imageCity from "../../images/city.png";

@inject("loginStore")
@observer
class Login extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.Auth.login(this.props.loginStore.userInfo.login, this.props.loginStore.userInfo.password)
            .then(res => {
                let decoded = decode(res.token);
                let route = decoded.user.accessMode === 0 ? "/client" : "/manager";
                this.props.loginStore.setId(decoded.user._id);
                this.props.loginStore.setPerson(decoded.user.firstName + ' ' + decoded.user.lastName);
                this.props.history.push(route);
            })
            .catch(err => {
                alert(err);
            });
        this.props.loginStore.clearForm();
    };


    render() {
        return (
            <div>
                <div className="text-center">
                    <h3 className="text-center p-4">Вход</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <SingleInput
                            additionalStyle = "w-75"
                            required = {true}
                            name={"username"}
                            inputType={"text"}
                            value={this.props.loginStore.userInfo.login}
                            controlFunc={this.props.loginStore.handleLoginChange}
                            placeholder={"Логин или номер телефона"}/>
                        <SingleInput
                            additionalStyle = "w-75"
                            name={"password"}
                            inputType={"password"}
                            value={this.props.loginStore.userInfo.password}
                            controlFunc={this.props.loginStore.handlePasswordChange}
                            placeholder={"Пароль"}/>
                        <input
                            type={"submit"}
                            className="btn-primary form-submit"
                            value={"Войти"}/>
                    </form>
                </div>

                <div>
                    <img className="footer h-50" src={imageCity}/>
                </div>
            </div>
        );
    }
}

export default Login;
