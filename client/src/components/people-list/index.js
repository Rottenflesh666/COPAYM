import React from 'react';
import SingleInput from "../common/single-input/single-input";
import {inject, observer} from 'mobx-react';
import { ListGroup, ListGroupItem, ButtonGroup, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewPeople from "../people-list/NewPeople";

@inject("managerStore")
@observer
class PeopleList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            newPeopleIsOpen : false,
            selected        : null,
            selectedUserID  : null,
            selectedUserName: null
        };

        this.toggleNewUser = this.toggleNewUser.bind(this);
    }

    componentWillMount = () => {
        const houseID = this.props.match.params.id;
        if (houseID === undefined) return;
        const managerID = this.props.managerStore.getManagerID;
        let token = localStorage.getItem("id_token");
        if (token !== null)
            token = "Bearer " + localStorage.getItem("id_token");
        fetch("/peopleList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify(
                {houseID, managerID}
            )
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response.status === 200) {
                    this.props.managerStore.setPeople(response.usersMap);
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

    onClickListItemHandle(user, selectedIndex){
        this.setState({
            selected        : selectedIndex,
            selectedUserID  : user.userID,
            selectedUserName: user.fullName
        });
    }

    closeNewPeople(){
        this.setState({newPeopleIsOpen: false});
    }

    onClickNewPeopleHandle(){
        this.setState({newPeopleIsOpen: true});
    }

    onClickDeleteHandle(){
        let token = localStorage.getItem("id_token");
        if (token !== null) token = "Bearer " + localStorage.getItem("id_token");
        fetch("/peopleList/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({_id: this.state.selectedUserID})
        })
            .then((response) => {
                switch (response.status){
                    case 200:
                        this.props.managerStore.deletePeople(this.state.selectedUserID);
                        this.setState({
                            selected        : null,
                            selectedUserID  : null,
                            selectedUserName: null
                        });
                        break;
                    case 404:
                        break;
                    case 403:
                        localStorage.removeItem("id_token");
                        this.props.history.push("/login");
                        break;
                    default:
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    toggleNewUser(result) {
        console.log(result.userID);
        if(result.userID !== undefined){
            this.props.managerStore.addPeople(result);
        }

        this.setState({
                newPeopleIsOpen: !this.state.newPeopleIsOpen
        })
    }

    showNewUser() {
        this.setState({
            newPeopleIsOpen: true
        });
    }

    showUsersList(){
        if(this.props.managerStore.usersList.length > 0) {
            return (
                <ListGroup>
                    {this.props.managerStore.usersList.map((user, index) => (
                        <ListGroupItem className="list-item-user text-left" tag="button" active={this.state.selected === index}
                                       onClick={() => this.onClickListItemHandle(user, index)}>
                            {user.fullName}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )
        } else {
            return(
                <div className="center-screen h6 font-italic text-center">
                    Жители не зарегистрированы
                </div>
            )
        }
    }

    render() {
        let houseAddress = localStorage.getItem("houseAddress");
        return(
            <div >
                <NewPeople houseID={localStorage.getItem("houseID")} managerID={localStorage.getItem("managerID")} isOpen={this.state.newPeopleIsOpen} toggleWin = {this.toggleNewUser}/>

                <div className="header-peoples bg-primary">
                    Дом# {' '} {houseAddress}
                </div>
                {this.showUsersList()}
                <div className="footer bg-primary h-45px">
                    <div className="align-left">
                        <Button className="btn-light" onClick={()=>this.onClickNewPeopleHandle()}>
                            <FontAwesomeIcon icon="user-plus"/>
                            <span className="pl-2">Добавить</span>
                        </Button>
                    </div>
                    <div className="align-right">
                        <Button className="btn-light" onClick={()=>this.onClickDeleteHandle()} disabled={this.state.selected ===  null}>
                            <FontAwesomeIcon icon="user-minus" />
                            <span className="pl-2">Удалить</span>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PeopleList;

/*

  <form  onSubmit={this.handleFormSubmit}>
                    <div>
                        {this.props.managerStore.peopleList !== [] ?
                            <ul>
                                {this.props.managerStore.usersList.map(user => (
                                    <li>{user.fullName}</li>))}
                            </ul>
                            : <span>no data</span>
                        }
                    </div>

                </form>
*/


 //  {/*<div>
 //           {this.props.managerStore.houseList.map((item, index)=>(
 //             <Item key={index} item={item} />
 //           ))}
 //         </div>*/}
//{/*<SingleInput
 //           className="form-input"
 //           name={"groupName"}
//            inputType={"text"}
//            value={this.props.managerStore.house.address}
//            controlFunc={this.props.managerStore.handleAddressChange}
//            placeholder={"адрес дома"} />
//          <input
//            type={"submit"}
//            className={"frmSubmitBtn"}
//            value={"Submit"} />*/}

