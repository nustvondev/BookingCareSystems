import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import logo from "../../assets/images/logologin.png";

import * as actions from "../../store/actions";
import "./Register.scss";
//import { handleLoginApi } from "../../services/userService";

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="parent clearfix">
                    <div className="bg-illustration">
                        <img src={logo} alt="logo" />
                        <div className="burger-btn">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                    <div className="register">
                        <div className="container">
                            <h1>
                                Create your account
                            </h1>
                            <div className="register-form">
                                <form action="" onSubmit={this.handleLogin}>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                    // onChange={(e) => {
                                    //   this.setState({ password: e.target.value });
                                    // }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                    // onChange={(e) => {
                                    //   this.setState({ password: e.target.value });
                                    // }}
                                    />
                                    <input
                                        type="email"
                                        placeholder="E-mail Address"
                                    // onChange={(e) => {
                                    //   this.setState({ email: e.target.value });
                                    // }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                    // onChange={(e) => {
                                    //   this.setState({ password: e.target.value });
                                    // }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Re-type Password"
                                    // onChange={(e) => {
                                    //   this.setState({ password: e.target.value });
                                    // }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                    // onChange={(e) => {
                                    //   this.setState({ password: e.target.value });
                                    // }}
                                    />
                                    <button type="submit">LOGIN</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
