import React, {Component} from "react";

/*
Коды счетов
1 - Отопление
2 - Холодная вода
3 - Электричество
4 - Газ
5 - Ремонт
6 - Горячая вода
 */

export default class ClientData extends Component {
    constructor(props) {
        super(props);

        this.houseAddress = localStorage.getItem("houseAddress");

        //Название типа данных
        let url = this.props.location.pathname;
        let typeID = parseInt( url.substring(url.lastIndexOf("/") + 1, url.length) );
        this.typeName = "Неизвестно";
        switch (typeID){
            case 1:
                this.typeName = "Отопление";
                break;
            case 2:
                this.typeName = "Холодная вода";
                break;
            case 3:
                this.typeName = "Электричество";
                break;
            case 4:
                this.typeName = "Газ";
                break;
            case 5:
                this.typeName = "Ремонт";
                break;
            case 6:
                this.typeName = "Горячая вода";
                break;
        }
    }

    render(){

        return (
            <div>
                <div className="header-peoples bg-primary">
                    Дом# {' '} {this.houseAddress} {" : "} <b>{localStorage.getItem("userName")}</b> {" : "} {this.typeName}
                </div>

                <div>
                    данные по : {this.typeName}
                </div>
            </div>
        )
    }

};
