import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedDateParts, FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class OutStandingDoctor extends Component {

    render() {
        let setting = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (

            <div className='section-share section-outstading-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở ý tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...setting}>

                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo Sư, Tiến Sĩ</div>
                                        <div>Cơ xương khớp 1</div>
                                    </div>
                                </div>
                            </div>


                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo Sư, Tiến Sĩ</div>
                                        <div>Cơ xương khớp 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo Sư, Tiến Sĩ</div>
                                        <div>Cơ xương khớp 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo Sư, Tiến Sĩ</div>
                                        <div>Cơ xương khớp 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo Sư, Tiến Sĩ</div>
                                        <div>Cơ xương khớp 1</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
