// @flow

import React, { Component } from 'react';

import AnimatedGraphLine from 'components/AnimatedGraphLine/AnimatedGraphLine';


type Props = {};

class AnimatedGraph extends Component<Props> {
  render() {
    return (
      <svg width='400' height='200' viewBox='0 0 340 200' id='top-graph'>
        <line x1='20' y1='155' x2='320' y2='155' style={{ stroke: 'black' }} />
        <line x1='20' y1='0' x2='20' y2='155' style={{ stroke: 'black' }} />
        <circle cx='50' cy='50' r='3' stroke='black' strokeWidth='3' fill='black'>
          <AnimatedGraphLine
            attributeName='cy'
            values='50;70;70;35;35;50;50'
          />
        </circle>
        <line x1='50' y1='50' x2='100' y2='100' style={{ stroke: 'black' }}>
          <AnimatedGraphLine
            attributeName='y1'
            values='50;70;70;35;35;50;50'
          />
          <AnimatedGraphLine
            attributeName='y2'
            values='100;85;85;110;110;100;100'
          />
        </line>
        <circle cx='100' cy='100' r='3' stroke='black' strokeWidth='3' fill='black'>
          <AnimatedGraphLine
            attributeName='cy'
            values='100;85;85;110;110;100;100'
          />
        </circle>
        <line x1='100' y1='100' x2='150' y2='80' style={{ stroke: 'black' }}>
          <AnimatedGraphLine
            attributeName='y1'
            values='100;85;85;110;110;100;100'
          />
          <AnimatedGraphLine
            attributeName='y2'
            values='80;45;45;110;110;80;80'
          />
        </line>
        <circle cx='150' cy='80' r='3' stroke='black' strokeWidth='3' fill='black'>
          <AnimatedGraphLine
            attributeName='cy'
            values='80;45;45;110;110;80;80'
          />
        </circle>
        <line x1='150' y1='80' x2='200' y2='70' style={{ stroke: 'black' }}>
          <AnimatedGraphLine
            attributeName='y1'
            values='80;45;45;110;110;80;80'
          />
          <AnimatedGraphLine
            attributeName='y2'
            values='70;45;45;90;90;70;70'
          />
        </line>
        <circle cx='200' cy='70' r='3' stroke='black' strokeWidth='3' fill='black'>
          <AnimatedGraphLine
            attributeName='cy'
            values='70;45;45;90;90;70;70'
          />
        </circle>
        <line x1='200' y1='70' x2='250' y2='50' style={{ stroke: 'black' }}>
          <AnimatedGraphLine
            attributeName='y1'
            values='70;45;45;90;90;70;70'
          />
          <AnimatedGraphLine
            attributeName='y2'
            values='50;20;20;30;30;50;50'
          />
        </line>
        <circle cx='250' cy='50' r='3' stroke='black' strokeWidth='3' fill='black'>
          <AnimatedGraphLine
            attributeName='cy'
            values='50;20;20;30;30;50;50'
          />
        </circle>
        <line x1='250' y1='50' x2='300' y2='25' style={{ stroke: 'black' }}>
          <AnimatedGraphLine
            attributeName='y1'
            values='50;20;20;30;30;50;50'
          />
          <AnimatedGraphLine
            attributeName='y2'
            values='25;40;40;60;60;25;25'
          />
        </line>
        <circle cx='300' cy='25' r='3' stroke='black' strokeWidth='3' fill='black'>
          <AnimatedGraphLine
            attributeName='cy'
            values='25;40;40;60;60;25;25'
          />
        </circle>
      </svg>
    );
  }
}

export default AnimatedGraph;
