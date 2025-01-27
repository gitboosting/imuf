import 'widgets';
import { getSketch } from "../modules/go_animate.js";
// import { asHeader } from '../modules/header.js';

HTMLWidgets.widget({

  name: 'imu_object',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var sketch;

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        // el.innerHTML = asHeader(x);
        sketch = getSketch(el);

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
