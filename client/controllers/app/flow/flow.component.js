'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './flow.routes';

export class FlowComponent {
  /*@ngInject*/
  constructor(FlowTracker) {
    this.dataModel = FlowTracker.flow();
    this.setCurrentPlace = FlowTracker.setCurrentPlace;
    this.postData = FlowTracker.postData;
    this.active = function(name) {
      if(FlowTracker.flow().maxPlace >= name) {
        return true;
      }
    };
  }
}

export default angular.module('bondStreetApp.flow', [uiRouter])
  .config(routes)
  .component('flow', {
    template: require('./flow.html'),
    controller: FlowComponent,
    controllerAs: 'flowCtrl'
  })
  .run(['$state', '$rootScope', '$injector', ($state, $rootScope, $injector) => {
    $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
      if(toState.data && toState.data.redirect) {
        var redirectTo = $injector.invoke(toState.data.redirect, this, {
          toStateParams: toParams,
          toState: toState
        });
        console.log('redirect', redirectTo);

        if(redirectTo) {
          event.preventDefault();
          $state.transitionTo(redirectTo);
        }
      }
    });
  }])
  .name;
