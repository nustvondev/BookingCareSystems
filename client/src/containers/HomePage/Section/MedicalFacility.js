import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedDateParts, FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { withRouter } from "react-router";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic._id}`);
    }
  };
  render() {
    let { dataClinics } = this.state;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở ý tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>

          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      className="section-customize clinic-child"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="bg-image section-medical-facility "
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="clinic-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
