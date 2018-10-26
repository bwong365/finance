import React, { Component }     from 'react';
import { compose }              from 'redux';
import { connect }              from 'react-redux';
import { shrinkApp, expandApp } from '../../actions/responsiveActions';

/**
 * Return a higher order component to make app responsive
 */
const makeResponsive = Comp => (
  class ResponsiveComponent extends Component {
    componentDidMount() {
      // Get window size for responsiveness
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }

    // Creates action based on windows size
    handleResize = () => {
      const { expandApp, shrinkApp, expanded } = this.props;
      
      if (window.innerWidth > 576 && !expanded) {
        expandApp();
      }

      if (window.innerWidth < 576 && expanded) {
        shrinkApp();
      }
    }

    render() {
      return <Comp {...this.props} />;
    }
  }
)

// map state and dispatch to props
export default compose(connect(
  state => ({ expanded: state.expanded }),
  { expandApp, shrinkApp }
), makeResponsive);