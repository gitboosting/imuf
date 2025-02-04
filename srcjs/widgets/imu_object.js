import 'widgets';
import { getSketch } from "../modules/go_animate.js";

HTMLWidgets.widget({

  name: 'imu_object',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var sketch;
    var elid;

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        // el.innerHTML = asHeader(x);
        sketch = getSketch(el);
        Shiny.setInputValue("elid", el.id);
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
