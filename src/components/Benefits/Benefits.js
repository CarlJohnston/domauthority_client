// @flow

import React, { Component } from 'react';

import Benefit from 'components/Benefit/Benefit';


type Props = {};

class Benefits extends Component<Props> {
  render() {
    return (
      <div className='grid-x features-grid'>
        <div className='cell'>
          <h2>
            Benefits
          </h2>
        </div>
        <div className='cell'>
          <p>
            Setup is painless and offers immediate benefits to both you and your clients.
          </p>
        </div>
        <div className='cell small-6 medium-4'>
          <Benefit
            iconClass='fi-wrench'
            title='Useful'
            description='Track relative to your competition'
          />
        </div>
        <div className='cell small-6 medium-4'>
          <Benefit
            iconClass='fi-graph-trend'
            title='Visual'
            description='Visualize your metrics at a glance.'
          />
        </div>
        <div className='cell small-6 medium-4'>
          <Benefit
            iconClass='fi-calendar'
            title='Automatic'
            description='No maintenance on your part.'
          />
        </div>
        <div className='cell small-6 medium-4'>
          <Benefit
            iconClass='fi-mail'
            title='Updates'
            description='Summaries straight to your inbox.'
          />
        </div>
        <div className='cell small-6 medium-4'>
          <Benefit
            iconClass='fi-star'
            title='Simple'
            description='Only a URL and name required.'
          />
        </div>
        <div className='cell small-6 medium-4'>
          <Benefit
            iconClass='fi-dollar'
            title='Free'
            description='Tracking without any fees.'
          />
        </div>
      </div>
    );
  }
}

export default Benefits;
