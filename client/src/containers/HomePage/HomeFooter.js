import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedDateParts, FormattedMessage } from 'react-intl';


class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2023 20DTHB3 Tình - Hòa - Hoàng</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
