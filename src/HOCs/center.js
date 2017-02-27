import React, { Component, PropTypes } from 'react';

export default function center(elm, childElm) {
  return function (Comp) {
    return class HOC extends Component {
      render() {
        const props = this.props;
        return (
          <Comp {...props} />
        );
      }

      componentDidUpdate() {
        $(document).ready(() => {
          function center() {
            const layoutWidth = $(elm).width();
            const childWidth = $(elm).find(childElm).outerWidth(true);
            const lineNum = Math.floor(layoutWidth / childWidth);
            const padding = (layoutWidth - (childWidth * lineNum)) / 2;
            $(elm).css({ paddingLeft: padding, paddingRight: padding });
          }

          center();
          window.addEventListener('scroll', center, true);
        });
      }
    };
  };
};
