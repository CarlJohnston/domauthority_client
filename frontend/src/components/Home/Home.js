import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AnimatedGraph from 'components/AnimatedGraph/AnimatedGraph';
import Benefits from 'components/Benefits/Benefits';
import Demo from 'components/Demo/Demo';

import withDocumentTitle from 'components/hocs/withDocumentTitle';

import './Home.css';


class Home extends Component {
  render() {
    return (
      <div>
        <section className='grid-container-fluid alternate-container-fluid callout-container'>
          <div className='grid-container'>
            <div className='grid-x'>
              <div className='cell medium-offset-2 medium-4 text-center'>
                <h1>Domain Tracking & Visualization</h1>
                <p className='lead'>Made for SEO Professionals</p>
              </div>
              <div className='cell medium-4 text-center animated-graph'>
                <AnimatedGraph />
              </div>
            </div>
          </div>
        </section>
        <section className='grid-container text-center section-container'>
          <Benefits />
        </section>
        <section className='grid-container-fluid alternate-container-fluid section-container-alternate'>
          <div className='grid-container text-center'>
            <div className='grid-x'>
              <div className='cell'>
                <h2>Ready to Sign Up?</h2>
              </div>
              <div className='cell'>
                <Link to='/register' className='button large'>Register</Link>
              </div>
            </div>
          </div>
        </section>
        <section className='grid-container graph-container'>
          <div className='grid-x text-center'>
            <div className='cell'>
              <h2>Visualization</h2>
            </div>
            <div className='cell large-8 large-offset-2'>
              <Demo />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withDocumentTitle(Home, 'Home');
