'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('userFlowApp.util', [])
  .factory('Util', UtilService)
  .name;
