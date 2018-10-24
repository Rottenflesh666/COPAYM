import React from 'react';
import SingleInput from "../common/single-input/single-input";
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import AuthService from '../../services/authservice';

@inject("managerStore")
@inject("loginStore")
@observer
class ManagerHome extends React.Component {
    componentWillMount = () => {
        //this.props.managerStore._id = this.props.loginStore._id;
        //const userID = this.props.loginStore.getId;

        this.Auth = new AuthService();
        if(this.Auth.loggedIn()){
            this.props.loginStore.setId(this.Auth.getProfile().user._id);
            this.props.loginStore.setPerson(this.Auth.getProfile().user.firstName + ' ' + this.Auth.getProfile().user.lastName);
        } else {
            console.log("not logged");
        }

        const userID = this.props.loginStore.getId;
        if (userID === undefined) return;

        this.props.managerStore.user = this.props.loginStore.getPerson;
        this.props.managerStore._id  = this.props.loginStore.getId;
        let token = localStorage.getItem("id_token");
        if (token !== null)
            token = "Bearer " + localStorage.getItem("id_token");
        fetch("/houseList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({
                userID
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response.status === 200) {
                    this.props.managerStore.setHouses(response.houseMap);
                } else if (response.status === 404) {

                } else if (response.status === 403) {
                    localStorage.removeItem("id_token");
                    this.props.history.push("/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();

    };

    onClickHandle(address, houseID){
        localStorage.setItem("houseAddress", address);
        localStorage.setItem("houseID", houseID);
        localStorage.setItem("managerID", this.props.managerStore.getManagerID);
        this.props.history.push("/manager/" + houseID);
    }

    render() {
        return (
            <ListGroup>
                {this.props.managerStore.housesList.map(house => (
                    <ListGroupItem className="list-item text-left" tag="button" onClick={()=>this.onClickHandle(house.address, house.id)}>
                        {house.address}
                    </ListGroupItem>
                ))}
             </ListGroup>
        )
    }
}

export default ManagerHome;