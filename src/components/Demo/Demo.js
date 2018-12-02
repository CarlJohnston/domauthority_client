import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery.tipsy';

import SiteGraph from 'mixins/SiteGraph';

import Data from './Data';

import 'jquery.tipsy/src/jquery.tipsy.css';

window.$ = window.jQuery = $;


const DOMAIN_AUTHORITY_CONTAINER_ID = 'graph';

class Demo extends Component {
  componentDidMount() {
    Date.isLeapYear = (year) => {
      return (((year % 4 === 0) && (year % 100 !== 0)) ||
              (year % 400 === 0));
    };

    Date.getDaysInMonth = (year, month) => {
      return [
        31,
        (Date.isLeapYear(year) ? 29 : 28),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ][month];
    };

    Date.prototype.isLeapYear = () => {
      return Date.isLeapYear(this.getFullYear());
    };

    Date.prototype.getDaysInMonth = function () {
      return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    };

    Date.prototype.addMonths = function (value) {
      let n = this.getDate();
      this.setDate(1);
      this.setMonth(this.getMonth() + value);
      this.setDate(Math.min(n, this.getDaysInMonth()));
      return this;
    };

    this.siteGraph = new SiteGraph({
      selector: `#${DOMAIN_AUTHORITY_CONTAINER_ID}`,
      time: '%Y-%m-%d',
      property: 'domain_authority',
      xAxis: 'Domain Authority',
      width: 777,
      height: 466,
    });

    this.generateRandomData();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  generateRandomData() {
    const initialData = JSON.parse(JSON.stringify(Data.data));

    const currentData = JSON.parse(JSON.stringify(initialData));

    this.siteGraph.update(initialData);

    const max = 50;
    const interval = 2300;

    let counter = 0;
    this.timer = setInterval(() => {
      if (counter++ >= max) {
        return;
      }

      for (let i = 0; i < 4; i++) {
        const currentSite = currentData[i];
        const currentMetrics = currentSite.metrics;

        const lastItemObject = currentMetrics[currentMetrics.length - 1];

        let newNumber;
        if (lastItemObject.domain_authority === 100) {
          newNumber = this.getRandomInt(85,90);
        } else if (lastItemObject.domain_authority === 0) {
          newNumber = this.getRandomInt(10,15);
        } else {
          newNumber = this.valBetween(lastItemObject.domain_authority + this.getRandomInt(-10, 10), 0, 100);
        }

        const previousDate = lastItemObject.created_at;
        const previousYear = previousDate.toString().slice(0, 4, 10);
        const previousMonth = parseInt(previousDate.toString().slice(5, 7), 10);
        const previousDay = parseInt(previousDate.toString().slice(8, 10), 10);

        const currentDate = new Date(
          previousYear,
          previousMonth - 1,
          previousDay,
        );
        currentDate.addMonths(1);

        currentMetrics.push({
          domain_authority: newNumber,
          created_at: currentDate.toISOString().slice(0, 10),
        });
      }

      const copiedData = JSON.parse(JSON.stringify(currentData));

      this.siteGraph.update(copiedData);
    }, interval);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  valBetween(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
  }

  render() {
    return (
      <div id={DOMAIN_AUTHORITY_CONTAINER_ID}>
      </div>
    );
  }
}

export default Demo;
