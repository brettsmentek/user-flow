'use strict';

export function FlowTrackerService($http, Auth) {
  'ngInject';

  var data;

  var promise = Auth.getCurrentUser().then(function(user) {
    if(user.data === null || user.data === undefined || user.data === '{}') {
      data = {};
    } else {
      data = JSON.parse(user.data);
      console.log(data);
    }
    if(data.maxPlace === undefined) {
      data.maxPlace = 1;
    }
  });

  var FlowTracker = {
    // this will be replaced by a POST request to the server
    promise: promise,

    flow: function() {
      return data;
    },

    // getter methods
    setCurrentPlace(place) {
      if(FlowTracker.flow().maxPlace < place) {
        FlowTracker.flow().maxPlace = place;
      }
    },
    setData(d) {
      FlowTracker.flow().data = d;
    },
    postData() {
      this.submitted = true;
      Auth.update(JSON.stringify(FlowTracker.flow()))
        .then(() => {
          console.log('Data posted', FlowTracker.flow());
        });
    }
  };

  return FlowTracker;
}
