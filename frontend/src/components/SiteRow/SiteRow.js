// @flow

import React, { Component } from 'react';


type Props = {
  site: {
    title: string,
    url: string,
  },
};

class SiteRow extends Component<Props> {
  render() {
    return (
      <tr>
        <td>{this.props.site.title}</td>
        <td>{this.props.site.url}</td>
      </tr>
    );
  }
}

export default SiteRow;
