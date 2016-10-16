'use strict';

import angular from 'angular';
import constants from '../../app/app.constants';
import util from '../util/util.module';

import {
  FlowTrackerService
} from './flowTracker.service';

import uiRouter from 'angular-ui-router';

export default angular.module('bondStreetApp.dataDashboard', [constants, util, uiRouter])
  .factory('FlowTracker', FlowTrackerService)
  .name;
