'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';

import _Auth from '../services/auth/auth.module';
import main from './main/main.component';
import account from '../controllers/account';
import admin from '../controllers/admin';
import navbar from '../layout/navbar/navbar.component';
import footer from '../layout/footer/footer.component';
import constants from './app.constants';
import util from '../services/util/util.module';
import flow from '../controllers/app/flow/flow.component';
// services
import flowService from '../services/flow/flow.module';

import './app.css';

// inject your components here
angular.module('bondStreetApp', [ngCookies, ngResource, ngSanitize, uiRouter,
    uiBootstrap, flowService, flow, _Auth, account, admin, navbar, footer, main, constants, util, ngAnimate
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['bondStreetApp'], {
      strictDi: false
    });
  });
