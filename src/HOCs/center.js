import React, { Component } from 'react';
import { stringify } from 'qs';
import request from '../utils/request';

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

      componentDidMount() {
        // 暂时将统计用户访问的接口放置在此处，将来有登录时，放在登录后执行。
        const data = {
          operationobject: '访问',
          operationdetail: '该ip浏览过首页',
        };
        request(`${api.mock_api}/insertoperationlog.do`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: stringify(data),
        });
      }
    };
  };
}
