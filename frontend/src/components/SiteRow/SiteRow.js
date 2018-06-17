import React, { Component } from 'react';

class SiteRow extends Component {
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
