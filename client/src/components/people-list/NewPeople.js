import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SingleInput from '../common/single-input/single-input';
import SwitchCheckbox from '../common/switch-checkbox/switch-checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NewPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            accessMode: false,
            houseID: props.houseID,
            managerID: props.managerID
        }

        this.handleChange = this.handleChange.bind(this);
        this.clearValues  = this.clearValues.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.type==="checkbox" ? event.target.checked : event.target.value
        });
    }

    cryptString(str, key) {
    //    var crypto = require('crypto'); //node crypto api
        return str;
      /*  return str.split('')
            .map(s => (s.charCodeAt()^key).toString(16) )
            .join('g');*/
    }

    clearValues(result){
        this.setState({
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            accessMode: false,
        });

        this.props.toggleWin(result);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        let token = localStorage.getItem("id_token");
        if (token !== null) token = "Bearer " + localStorage.getItem("id_token");

        fetch("/peopleList/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify(this.state, (key, value)=>{
                if(typeof(value) === "string"){
                    return this.cryptString(value, token);
                } else {
                    return value;
                }
            })
        })
            .then((response) => {
                switch (response.status){
                    case 200:
                        return response.json();
                        break;
                    case 404:
                        return false;
                    case 403:
                        localStorage.removeItem("id_token");
                        this.props.history.push("/login");
                        break;
                    default:
                        this.clearValues();
                }
            })
            .then((response) => {
                this.clearValues(response.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggleWin}>
                    <ModalHeader>
                        <FontAwesomeIcon icon="user-plus"/>{" "}
                        Новый житель
                    </ModalHeader>

                        <form onSubmit={this.handleFormSubmit}>
                            <ModalBody>
                            <SingleInput
                                additionalStyle = "w-100 display-block"
                                title = "Имя"
                                id = "firstName"
                                required = {true}
                                name={"firstName"}
                                inputType={"text"}
                                value={this.state.firstName}
                                controlFunc={this.handleChange}
                                placeholder={"Имя"}/>
                            <SingleInput
                                additionalStyle = "w-100 display-block"
                                title = "Фамилия"
                                id = "lastName"
                                required = {true}
                                name={"lastName"}
                                inputType={"text"}
                                value={this.state.lastName}
                                controlFunc={this.handleChange}
                                placeholder={"Фамилия"}/>
                            <SingleInput
                                additionalStyle = "w-100 display-block"
                                title = "Логин"
                                id = "login"
                                required = {true}
                                name={"login"}
                                inputType={"text"}
                                value={this.state.login}
                                controlFunc={this.handleChange}
                                placeholder={"Логин"}/>
                            <SingleInput
                                additionalStyle = "w-100 display-block"
                                title = "Пароль"
                                id = "password"
                                required = {true}
                                name={"password"}
                                inputType={"text"}
                                value={this.state.password}
                                controlFunc={this.handleChange}
                                placeholder={"Пароль"}/>

                            <div className="pb-26px">
                                <label className="align-left">
                                    Администратор
                                </label>
                                <SwitchCheckbox
                                    additionalStyle = "align-right"
                                    id="accessMode"
                                    name={"accessMode"}
                                    value={this.state.accessMode}
                                    controlFunc={this.handleChange}/>
                            </div>
                    </ModalBody>
                    <ModalFooter className="pt-4">
                        <Button type={"submit"} color="primary">Сохранить</Button>{' '}
                        <Button color="secondary" onClick={this.clearValues}>Отмена</Button>
                    </ModalFooter>
                        </form>
                </Modal>
            </div>
        );
    }
}

export default NewPeople;