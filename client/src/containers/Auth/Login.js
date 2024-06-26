/* eslint no-use-before-define: 0 */ 
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import logo from "../../assets/images/logologin.png";

import * as actions from "../../store/actions";
import { handleLoginApi } from "../../services/userService";
import "./Login.scss";
import { ToastUtil } from "../../utils";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMessage: "",
    };
  }
  handleLogin = async (e) => {
    e.preventDefault();
    this.setState({
      errMessage: "",
    });
    if (this.state.email === "" || this.state.password === "") {
      ToastUtil.error(
        "Thong Bao",
        "Tai khoan hoac mat khau khong duoc bo trong!"
      );
    } else {
      try {
        let data = await handleLoginApi(this.state.email, this.state.password);
        if (data && data.errCode !== 200) {
          ToastUtil.error(
            "Thong Bao",
            "Tai khoan hoac mat khau khong chinh xac!"
          );
          this.setState({
            errMessage: data.message,
          });
        }
        if (data && data.errCode === 200) {
          this.props.userLoginSuccess(data.user);
          ToastUtil.success("Thong Bao", "Dang nhap thanh cong!");
          // alert("loging true");
          // console.log(data.user);
        }
      } catch (e) {
        if (e.response) {
          if (e.response.status === 401) {
            this.setState({
              errMessage: "Invalid email or password",
            });
          } else if (e.response.data) {
            ToastUtil.error("Thong Bao", "Tai khoan khong ton tai!");
            this.setState({
              errMessage: e.response.data.message,
            });
          }
        }
        // console.log("error message", e.response);
      }
    }
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="logins-containers">
        <div className="parent clearfix">
          <div className="bg-illustration">
            <img src={logo} alt="logo" />
            <div className="burger-btn">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="login">
            <div className="container">
              <h1>
                Login to access to
                <br />
                your account
              </h1>
              <div className="login-form">
                <form action="" onSubmit={this.handleLogin}>
                  <input
                    type="email"
                    placeholder="E-mail Address"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    onKeyDown={(event) => this.handleKeyDown(event)}
                  />
                  <div className="remember-form">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </div>
                  <div className="forget-pass">
                    <div onClick={()=>{alert("Feature is not available!")}}>Forgot Password ?</div>
                  </div>
                  <button type="submit">LOG-IN</button>
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
    userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
