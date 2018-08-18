// @flow

import React, { Component } from 'react';


type Props = {
  attributeName: string,
  values: string,
};

class AnimatedLineComponent extends Component<Props> {
  render() {
    const {
      attributeName,
      values,
    } = this.props;

    return (
      <animate
        attributeName={attributeName}
        begin='0s'
        dur='4s'
        values={values}
        keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1'
        calcMode='spline'
        repeatCount='indefinite'
      />
    );
  }
}

export default AnimatedLineComponent;
