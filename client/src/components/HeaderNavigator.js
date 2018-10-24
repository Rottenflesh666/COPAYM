import React from 'react';
import "bootstrap";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, Navbar, Nav, NavLink, UncontrolledDropdown, NavbarBrand, NavbarToggler, Collapse, Badge } from 'reactstrap';
import { Link, withRouter} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from '../services/authservice';

@withRouter
export default class HeaderNavigation extends React.Component {
    static contextTypes = {
        router: () => null // replace with PropTypes.object if you use them
    }

    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false
        };

        this.username = props.username;

        this.Auth = new AuthService();
    }

    closeMenu (menuID) {
        if(menuID === 99 && this.Auth.loggedIn()){
            this.Auth.logout();
        }

        this.setState({menuOpen: false})
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildMenuItem(menuID, menuLink, menuIcon, menuCaption){
        return(
            <Link  onClick={() => this.closeMenu(menuID)} className={menuID === 99?"menu-item border-top":"menu-item"} to={menuLink}>
                <FontAwesomeIcon icon={menuIcon} className="menu-icon"/>
                <span className="m-3">{menuCaption}</span>
            </Link>
        )
    }

    buildDefaultMenu (){
        return  (
            <Menu right width='100%' height="100%" isOpen={this.state.menuOpen}>
                {this.buildMenuItem(0,  "/",      "home",        "Домой")}
                {this.buildMenuItem(99, "/login", "sign-in-alt", "Вход")}
            </Menu>
        );

    }

    buildUserMenu(username){
        return  (
            <Menu right width='100%' height="100%" isOpen={this.state.menuOpen}>
                {this.buildMenuItem(0, "/", "home",         "Домой")}
                {this.buildMenuItem(1, "/", "chart-bar",    "Показания")}
                {this.buildMenuItem(2, "/", "comments",     "Сообщения")}
                {this.buildMenuItem(3, "/", "ruble-sign",   "Тарифы")}
                {this.buildMenuItem(99, username === null?"/login":"", username === null?"sign-in-alt":"sign-out-alt",   username === null?"Вход":"Выход")}
            </Menu>
        );
    }

    buildAdminMenu(username){
        return  (
            <Menu right width='100%' height="100%" isOpen={this.state.menuOpen}>
                {this.buildMenuItem(0, "/",         "home",         "Домой")}
                {this.buildMenuItem(1, "/manager",  "users",        "Клиенты")}
                {this.buildMenuItem(2, "/",         "comments",     "Сообщения")}
                {this.buildMenuItem(3, "/",         "ruble-sign",   "Тарифы")}
                {this.buildMenuItem(99, username === null?"/login":"", username === null?"sign-in-alt":"sign-out-alt",   username === null?"Вход":"Выход")}
            </Menu>
        );
    }

    createBackButton(path){
        //образец: module\любойсимвол
        //Список страниц для которых надо рисовать кнопку назад
        const pagesForBackButton = [
            /manager[\/]\w/,
            /client[\/]\w/
        ];
        let pos = pagesForBackButton.some(function(element){
            return element.test(path)?true:false;
        })

        if(pos){
            return  <Button color="primary" className="header-icon" onClick={this.context.router.history.goBack}><FontAwesomeIcon icon="arrow-left"/></Button>
        } else {
            return null;
        }
    }

    render() {
        //Кнопка назад, если необходима
        const currentRoute = this.props.location.pathname;
        let backButton = this.createBackButton(currentRoute);

        //Построение меню в зависимости от логина
        var username = null;
        var menu = null;
        if(this.Auth.loggedIn()){
            username = this.capitalizeFirstLetter(this.Auth.getProfile().user.firstName.toLowerCase()) + ' ' +  this.capitalizeFirstLetter(this.Auth.getProfile().user.lastName.toLowerCase());
            menu = (this.Auth.getProfile().user.accessMode === 1 ? this.buildAdminMenu(username) : this.buildUserMenu(username));
        } else (
            menu = this.buildDefaultMenu()
        )


        return (
            <Navbar className="bg-primary" expand="sm" fixed="top">
                <NavbarBrand className="text-white header font-weight-bold">
                    {backButton}
                    {username}
                </NavbarBrand>
                {menu}
            </Navbar>
        )
    }
}

/*
            <div className="container-fluid">
                <div className="row">
                    <div className="col">User name</div>
                    <div className="justify-content-end">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Dropdown
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Header</DropdownItem>
                                <DropdownItem>Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Выход</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                    </div>
                </div>
            </div>
 */

            /*
            <Navbar className="bg-primary" expand="sm" fixed="top">
                    <NavbarBrand className="text-white">User Name</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.dropdownOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav className="custom-toggler">
                                    <span className="navbar-toggler-icon"></span>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        ы
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavLink href="/login">Вход</NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
             */