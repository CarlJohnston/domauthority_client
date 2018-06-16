import React, { Component } from 'react';

class AnimatedGraph extends Component {
  render() {
    return (
        <svg width='400' height='200' viewBox='0 0 340 200' id='top-graph'>
        <line x1='20' y1='155' x2='320' y2='155' style={{ stroke: 'black' }} />
        <line x1='20' y1='0' x2='20' y2='155' style={{ stroke: 'black' }} />
        <circle cx='50' cy='50' r='3' stroke='black' strokeWidth='3' fill='black'>
        <animate attributeName='cy' begin='0s' dur='4s' values='50;70;70;35;35;50;50' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </circle>
        <line x1='50' y1='50' x2='100' y2='100' style={{ stroke: 'black' }}>
        <animate attributeName='y1' begin='0s' dur='4s' values='50;70;70;35;35;50;50' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        <animate attributeName='y2' begin='0s' dur='4s' values='100;85;85;110;110;100;100' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </line>
        <circle cx='100' cy='100' r='3' stroke='black' strokeWidth='3' fill='black'>
        <animate attributeName='cy' begin='0s' dur='4s' values='100;85;85;110;110;100;100' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </circle>
        <line x1='100' y1='100' x2='150' y2='80' style={{ stroke: 'black' }}>
        <animate attributeName='y1' begin='0s' dur='4s' values='100;85;85;110;110;100;100' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        <animate attributeName='y2' begin='0s' dur='4s' values='80;45;45;110;110;80;80' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </line>
        <circle cx='150' cy='80' r='3' stroke='black' strokeWidth='3' fill='black'>
        <animate attributeName='cy' begin='0s' dur='4s' values='80;45;45;110;110;80;80' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </circle>
        <line x1='150' y1='80' x2='200' y2='70' style={{ stroke: 'black' }}>
        <animate attributeName='y1' begin='0s' dur='4s' values='80;45;45;110;110;80;80' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        <animate attributeName='y2' begin='0s' dur='4s' values='70;45;45;90;90;70;70' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </line>
        <circle cx='200' cy='70' r='3' stroke='black' strokeWidth='3' fill='black'>
        <animate attributeName='cy' begin='0s' dur='4s' values='70;45;45;90;90;70;70' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </circle>
        <line x1='200' y1='70' x2='250' y2='50' style={{ stroke: 'black' }}>
        <animate attributeName='y1' begin='0s' dur='4s' values='70;45;45;90;90;70;70' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        <animate attributeName='y2' begin='0s' dur='4s' values='50;20;20;30;30;50;50' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </line>
        <circle cx='250' cy='50' r='3' stroke='black' strokeWidth='3' fill='black'>
        <animate attributeName='cy' begin='0s' dur='4s' values='50;20;20;30;30;50;50' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </circle>
        <line x1='250' y1='50' x2='300' y2='80' style={{ stroke: 'black' }}>
        <animate attributeName='y1' begin='0s' dur='4s' values='50;20;20;30;30;50;50' keySplines='0.1 0.8 0.2 1; 
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        <animate attributeName='y2' begin='0s' dur='4s' values='25;40;40;60;60;25;25' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </line>
        <circle cx='300' cy='25' r='3' stroke='black' strokeWidth='3' fill='black'>
        <animate attributeName='cy' begin='0s' dur='4s' values='25;40;40;60;60;25;25' keySplines='0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
        </circle>
        </svg>
    );
  }
}

export default AnimatedGraph;
