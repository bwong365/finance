import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { shrinkApp, expandApp } from '../../actions/responsive.actions';

const responsive = Comp => (
  class ResponsiveComponent extends Component {
    componentDidMount() {
      // Get window size for responsiveness
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }

    // Creates action based on windows size
    handleResize = () => {
      if (window.innerWidth > 576 && !this.props.expanded) {
        this.props.expandApp();
      }

      if (window.innerWidth < 576 && this.props.expanded) {
        this.props.shrinkApp();
      }
    }

    render() {
      return <Comp {...this.props} />
    }
  }
)

export default compose(connect(
  state => ({ expanded: state.expanded }),
  { expandApp, shrinkApp }
), responsive);