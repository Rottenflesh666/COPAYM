/*
Коды счетов
1 - Отопление
2 - Холодная вода
3 - Электричество
4 - Газ
5 - Ремонт
6 - Горячая вода
 */

import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';


export default class ClientHome extends Component {
    constructor(props) {
        super(props);

        this.chartColors = {
            heating     : "#f2a34f",
            coldwater   : "#65c6e6",
            electric    : "#62c336",
            gas         : "#8b00b4",
            repair      : "#c05087",
            hotwater    : "#ee4145"
        };
    }

    handleCardClick(typeID){
        this.props.history.push(this.props.location.pathname + "/" + typeID);
    }

    buildCards(){
        return (
            <div className="people-cards-content">

                <div className="people-card" onClick={()=>this.handleCardClick(1)}>
                    <FontAwesomeIcon icon={"hot-tub"} size="5x" color={this.chartColors.heating} className="people-card-icon"/>
                    <div className="people-card-title">
                        Отопление
                    </div>
                </div>
                <div className="people-card" onClick={()=>this.handleCardClick(2)}>
                    <FontAwesomeIcon icon={"tint"} size="5x" color={this.chartColors.coldwater} className="people-card-icon"/>
                    <div className="people-card-title">
                        Холодная вода
                    </div>
                </div>
                <div className="people-card" onClick={()=>this.handleCardClick(3)}>
                    <FontAwesomeIcon icon={"bolt"} size="5x"  color={this.chartColors.electric} className="people-card-icon"/>
                    <div className="people-card-title">
                        Электричество
                    </div>
                </div>
                <div className="people-card" onClick={()=>this.handleCardClick(4)}>
                    <FontAwesomeIcon icon={"fire"} size="5x" color={this.chartColors.gas} className="people-card-icon"/>
                    <div className="people-card-title">
                        Газ
                    </div>
                </div>
                <div className="people-card" onClick={()=>this.handleCardClick(5)}>
                    <FontAwesomeIcon icon={"screwdriver"} size="5x"  color={this.chartColors.repair} className="people-card-icon"/>
                    <div className="people-card-title">
                        Ремонт
                    </div>
                </div>
                <div className="people-card" onClick={()=>this.handleCardClick(6)}>
                    <FontAwesomeIcon icon={"thermometer-three-quarters"} size="5x" color={this.chartColors.hotwater} className="people-card-icon"/>
                    <div className="people-card-title">
                        Горячая вода
                    </div>
                </div>
            </div>
        )
    }

    buildChart(){
        const data = [
            {name: 'Янв', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Фев', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Мар', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Апр', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Май', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Июн', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Июл', uv: 3490, pv: 4300, amt: 2100},
            {name: 'Авг', uv: 3490, pv: 4300, amt: 2100},
            {name: 'Сен', uv: 3490, pv: 4300, amt: 2100},
            {name: 'Окт', uv: 3490, pv: 4300, amt: 2100},
            {name: 'Ноя', uv: 3490, pv: 4300, amt: 2100},
            {name: 'Дек', uv: 3490, pv: 4300, amt: 2100}
        ];

        return (
            <ResponsiveContainer>
                <LineChart data={data} margin={{top: 10, right: 10, left: 10, bottom: 10}}>
                    <Line type="monotone" dataKey="uv" stroke={this.chartColors.heating} />

                    <XAxis dataKey="name" tick={{fontSize: 12}} angle={-90} textAnchor="end" dx={-5}/>
                    <YAxis tick={{fontSize: 12}}/>
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        )
    }

    render(){
        let houseAddress = localStorage.getItem("houseAddress");

        return (
            <div>
                <div className="header-peoples bg-primary">
                    Дом# {' '} {houseAddress} {" : "} <b>{localStorage.getItem("userName")}</b>
                </div>

                <div className="people-body">
                    <div className="people-chart">
                        {this.buildChart()}
                    </div>

                    {this.buildCards()}

                </div>
            </div>
        )
    }
}
