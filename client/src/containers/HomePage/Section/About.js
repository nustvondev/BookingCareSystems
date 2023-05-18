import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Truyền thông nói về 20DTHB3</div>
        <div className="section-about-content">
          <div className="content-left">
            {/* <iframe width="100%" height="400px"
                            // src="https://www.youtube.com/embed/VznptsZ9QZU?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                            // title="YouTube video player"
                            // frameBorder="0"
                            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            // allowFullScreen>
                        </iframe> */}
          </div>
          <div className="content-right">
            <p>
              Lớp học 20DTHB3 là một lớp học chuyên ngành Công nghệ thông tin,
              với sự tham gia của các sinh viên đầy nhiệt huyết và đam mê trong
              lĩnh vực này. Những giờ học tại lớp mang lại cho sinh viên cơ hội
              để tiếp thu và nâng cao kiến thức, cũng như rèn luyện kỹ năng làm
              việc nhóm và giải quyết vấn đề.
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
