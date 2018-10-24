import {observable, action, computed} from 'mobx';
import React from 'react';

class ManagerStore {
    @observable housesList;
    @observable usersList;
    user;
    _id;

    constructor() {
        this.housesList = [];
        this.usersList = [];
    }

    @action setHouses(houses) {
        this.housesList = houses;
    };

    @action setPeople(people) {
        this.usersList= people;
    }

    @action deletePeople(idPeople){
        this.usersList = this.usersList.filter(item => {
            return item.userID !== idPeople;
        })
    }

    @action addPeople(people){
        this.usersList.push({
            fullName: people.firstName + " " + people.lastName,
            userID  : people.userID
        })
    }

    @computed  get getPersonInfo(){
        return this.user;
    }

    @computed  get getManagerID(){
        return this._id;
    }
}

export default new ManagerStore();
