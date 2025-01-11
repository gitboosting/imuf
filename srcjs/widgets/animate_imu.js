import 'widgets';
import { getSketch, init } from "../modules/go_animate.js";

HTMLWidgets.widget({

  name: 'animate_imu',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        var sketch = getSketch(el);

        const data = x.data;
        const dt = x.dt;

        init(data, dt, sketch);

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
