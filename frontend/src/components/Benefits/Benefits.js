// @flow

import React, { Component } from 'react';


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
          <i className='fi-wrench' />
          <h4>
            Useful
          </h4>
          <p>
            Track relative to your competitors.
          </p>
        </div>
        <div className='cell small-6 medium-4'>
          <i className='fi-graph-trend' />
          <h4>
            Visual
          </h4>
          <p>
            Visualize your metrics at a glance.
          </p>
        </div>
        <div className='cell small-6 medium-4'>
          <i className='fi-calendar' />
          <h4>
            Automatic
          </h4>
          <p>
            No maintenance on your part.
          </p>
        </div>
        <div className='cell small-6 medium-4'>
          <i className='fi-mail' />
          <h4>
            Updates
          </h4>
          <p>
            Summaries straight to your inbox.
          </p>
        </div>
        <div className='cell small-6 medium-4'>
          <i className='fi-star' />
          <h4>
            Simple
          </h4>
          <p>
            Only a URL and name required.
          </p>
        </div>
        <div className='cell small-6 medium-4'>
          <i className='fi-dollar' />
          <h4>
            Free
          </h4>
          <p>
            Tracking without any fees.
          </p>
        </div>
      </div>
    );
  }
}

export default Benefits;
