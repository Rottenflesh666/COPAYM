import React, {Component} from "react";
import imageCity from "../../images/city.png";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <div className="indentAll text-center font-weight-bold content">
                    Сервис для взаимодействия<br/> между управляющей компанией и собственниками квартир
                </div>
                <img className="footer h-50" src={imageCity}/>
            </div>
        )
    }

};
