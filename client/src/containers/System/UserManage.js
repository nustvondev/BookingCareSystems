import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true
    });

  }

  handleDeleteUser = () => {
    alert("Delete me");
  }

  handleEditUser = () => {
    alert("Change me")
  }

  toggleFromParent = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser
    });
  }

  /** Life cycle
   *  Run component:
   * 1. Run construct -> init state
   * 2. Did mount (set state) : born ; unmount
   * 3. Render (re-render)
   *
   */
  render() {
    let arrUsers = this.state.arrUsers;
    console.log(arrUsers);
    //properties ; nested
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={() => { this.toggleFromParent() }}
        />
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
            <i className="fas fa-plus"></i> Add new users
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit" onClick={() => this.handleEditUser()}>
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="btn-delete" onClick={() => this.handleDeleteUser()}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
