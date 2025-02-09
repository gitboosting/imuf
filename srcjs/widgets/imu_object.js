import 'widgets';
import { getSketch } from "../modules/go_animate.js";

HTMLWidgets.widget({

  name: 'imu_object',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var sketch;

    return {

      renderValue: function(x) {

        sketch = getSketch(el);
        sketch.updateMesh(x.data);
        Shiny.setInputValue("elid", el.id);
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      },

      getSketch: function() {
        return sketch;
      }

    };
  }
});

// function to retrieve html widget with html element id
function get_sketch(id){
  var widget = HTMLWidgets.find("#" + id);
  var sketch = widget.getSketch();
  return sketch;
}

// logic to process message sent from R
// check if shiny running
if (HTMLWidgets.shinyMode){

  // send-data message handler
  Shiny.addCustomMessageHandler(
    "send-data", function(message) {

    // retrieve sketch
    var sketch = get_sketch(message.id);

    // update animation
    sketch.updateMesh(message.data);

  });

}
