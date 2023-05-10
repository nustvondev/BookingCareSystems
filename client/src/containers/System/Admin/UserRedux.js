import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',

      action: '',
      userEditId: '',

    }
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isGetGenders = this.props.isLoadingGender;


    let { email, password, firstName, lastName,
      phoneNumber, address, gender, position, role, avatar
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title">
          React-Redux
        </div>
        <div className="user-redux-body" >
          <div className="container">
            <div className="row">
              <div className="col-12 my-3"><FormattedMessage id="manage-user.add" /> </div>
              <div className="col-12">{isGetGenders === true ? 'Loading genders' : ''}</div>

              <div className="col-3">
                <label><FormattedMessage id="manage-user.email" /> </label>
                <input className="form-control" type="email"
                  value={email}
                  onChange={(event) => { this.onChangeInput(event, 'email') }}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                />
              </div>
              <div className="col-3">
                <label><FormattedMessage id="manage-user.password" /> </label>
                <input className="form-control" type="password"
                  value={password}
                  onChange={(event) => { this.onChangeInput(event, 'password') }}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                />
              </div>
              <div className="col-3">
                <label><FormattedMessage id="manage-user.first-name" /></label>
                <input className="form-control" type="text"
                  value={firstName}
                  onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                />
              </div>
              <div className="col-3">
                <label><FormattedMessage id="manage-user.last-name" /></label>
                <input className="form-control" type="text"
                  value={lastName}
                  onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                />
              </div>
              <div className="col-3">
                <label><FormattedMessage id="manage-user.phone-number" /></label>
                <input className="form-control" type="text"
                  value={phoneNumber}
                  onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}

                />
              </div>
              <div className="col-9">
                <label><FormattedMessage id="manage-user.address" /></label>
                <input className="form-control" type="text"
                  value={address}
                  onChange={(event) => { this.onChangeInput(event, 'address') }}
                />
              </div>

              <div className="col-3">
                <label><FormattedMessage id="manage-user.gender" /></label>
                <select className="form-control"
                  onChange={(event) => { this.onChangeInput(event, 'gender') }}
                  value={gender}
                >
                  {genders && genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </option>
                      )
                    })
                  }
                </select>
              </div>

              <div className="col-3">
                <label><FormattedMessage id="manage-user.position" /></label>
                <select className="form-control"
                  value={position}
                  onChange={(event) => { this.onChangeInput(event, 'position') }}
                >
                  {positions && positions.length > 0
                    && positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label><FormattedMessage id="manage-user.role" /></label>
                <select className="form-control"
                  onChange={(event) => { this.onChangeInput(event, 'role') }}
                  value={role}
                >
                  {roles && roles.length > 0
                    && roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}

                </select>
              </div>

              <div className="col-3">
                <label><FormattedMessage id="manage-user.image" /></label>
                <div className="preview-img-container">
                  <input id="previewImg" type="file" hidden
                    onChange={(event) => this.handleOnchangeImage(event)}

                  />
                  <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                  <div className="preview-image"
                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                    onClick={() => this.openPreviewImage()}
                  >
                  </div>
                </div>

              </div>
              <div className="col-12 my-3">
                <button
                  className={this.state.action === CRUD_ACTIONS.EDIT ? "btn  btn-warning" : "btn btn-primary"}
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ?
                    <FormattedMessage id="manage-user.edit" />
                    :
                    <FormattedMessage id="manage-user.save" />
                  }
                </button>
              </div>

              <div className="col-12 mb-5">
                {/* Task của bài sau đừng xóa nghen đm <TableManageUser
                  handleEditUserFromParentKey={this.handleEditUserFromParent}
                  action={this.state.action}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
