// @flow

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

import type { ComponentType } from 'react';


function withDocumentTitle(WrappedComponent: ComponentType<any>, title: string) {
  return class extends Component<{}> {
    render() {
      return (
        <DocumentTitle title={`${title} | domauthority`}>
          <WrappedComponent
            {...this.props}
          />
        </DocumentTitle>
      );
    }
  };
}

export default withDocumentTitle;
