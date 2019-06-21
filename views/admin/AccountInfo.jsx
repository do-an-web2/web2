import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

class AccountInfo extends React.Component {

    DangXuatHandle = () => {
        localStorage.removeItem('token');
    }

    render() {
        let token = localStorage.getItem('token');
        let user = jwtDecode(token);
        let TenHienThi=user.TenHienThi;
        return (
            <div className="container" id="topBar">
            <div className="navbar navbar-inverse">
                <ul className="nav pull-right">
                    <li className="dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="glyphicon glyphicon-user"></span> {TenHienThi} <b className="caret"></b></a>
                        <ul className="dropdown-menu">
                        <li><Link to="/"><i className="glyphicon glyphicon-menu-hamburger"></i> Trang khách hàng</Link></li>
                            <li><Link to="/"><a onClick={this.DangXuatHandle}><span className="glyphicon glyphicon-off"></span> Đăng xuất</a></Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        )
    }
}
export default AccountInfo;