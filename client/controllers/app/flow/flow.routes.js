'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('flow', {
      url: '/flow',
      component: 'flow',
      template: '<flow></flow>',
      authenticate: true
    })
    .state('flow.one', {
      url: '/one',
      template: require('./flow1.html'),
      authenticate: true,
      resolve: {
        flowData: function(FlowTracker) {
          return FlowTracker.promise;
        }
      }
    })
    .state('flow.two', {
      url: '/two',
      template: require('./flow2.html'),
      authenticate: true,
      data: {
        redirect: ['FlowTracker', FlowTracker => {
          if(FlowTracker.flow().maxPlace < 2 || !FlowTracker.flow().fname) {
            return 'flow.one';
          }
        }]
      }
    })
    .state('flow.three', {
      url: '/three',
      template: require('./flow3.html'),
      authenticate: true,
      data: {
        redirect: ['FlowTracker', FlowTracker => {
          if(FlowTracker.flow().maxPlace < 3 || !FlowTracker.flow().mname) {
            return 'flow.two';
          }
        }]
      }
    })
    .state('flow.four', {
      url: '/four',
      template: require('./flow4.html'),
      authenticate: true,
      data: {
        redirect: ['FlowTracker', FlowTracker => {
          if(FlowTracker.flow().maxPlace < 4 || !FlowTracker.flow().lname) {
            return 'flow.three';
          }
        }]
      }
    })
    .state('flow.five', {
      url: '/five',
      template: require('./flow5.html'),
      authenticate: true,
      data: {
        redirect: ['FlowTracker', FlowTracker => {
          if(FlowTracker.flow().maxPlace < 5 || !FlowTracker.flow().quest) {
            return 'flow.four';
          }
        }]
      }
    })
    .state('flow.done', {
      url: '/done',
      template: require('./flow6.html'),
      authenticate: true,
      data: {
        redirect: ['FlowTracker', FlowTracker => {
          if(FlowTracker.flow().maxPlace < 6 || !FlowTracker.flow().fcolor) {
            return 'flow.five';
          }
        }]
      }
    });
}
