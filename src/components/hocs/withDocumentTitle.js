// @flow

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

import type { ComponentType } from 'react';

import APPLICATION from 'configs/Application';


function withDocumentTitle(WrappedComponent: ComponentType<any>, title: string) {
  return class extends Component<{}> {
    render() {
      return (
        <DocumentTitle title={`${title} | ${APPLICATION.title}`}>
          <WrappedComponent
            {...this.props}
          />
        </DocumentTitle>
      );
    }
  };
}

export default withDocumentTitle;
