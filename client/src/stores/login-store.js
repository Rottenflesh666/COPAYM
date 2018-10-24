import {observable, action, computed} from "mobx";

class AppStore {
    personInfo;
    _id;
    @observable userInfo;

    constructor() {
        this.userInfo = {
            login: '',
            password: ''
        };
    };

    @action setId(id) {
        this._id = id;
    }

    @action setPerson(fullName) {
        this.personInfo = fullName;
    }

    @computed get getId() {
        return this._id;
    }

    @computed get getPerson() {
        return this.personInfo;
    }

    @action
    handleLoginChange = (e) => {
        e.preventDefault();
        this.userInfo.login = e.target.value;
    };

    @action
    handlePasswordChange = (e) => {
        e.preventDefault();
        this.userInfo.password = e.target.value;
    };

    @action
    clearForm = () => {
        this.userInfo = {
            login: "",
            password: ""
        }
    };
}

export default new AppStore();
