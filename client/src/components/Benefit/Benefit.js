// @flow

import React, { Component } from 'react';


type Props = {
  iconClass: string,
  title: string,
  description: string,
};

class Benefit extends Component<Props> {
  render() {
    const {
      iconClass,
      title,
      description,
    } = this.props;

    return (
      <React.Fragment>
        <i className={iconClass} />
        <h4>
          {title}
        </h4>
        <p>
          {description}
        </p>
      </React.Fragment>
    );
  }
}

export default Benefit;
