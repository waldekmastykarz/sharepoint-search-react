var React = require('react');

var Spinner = React.createClass({
  numCircles: 8,
  
  getInitialState: function() {
    return {
      startCircle: 1
    };
  },

  componentDidMount: function() {
    var component = this;
    component.interval = setInterval(function() {
      var startCircle = component.state.startCircle - 1;
      if (startCircle <= 0) {
        startCircle = component.numCircles;
      }
      component.setState({startCircle: startCircle});
    }, 90);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    var component = this;
    var offsetSize = 0.179;
    var parentSize = this.props.size === 'large' ? 28 : 20;
    
    var angle = 0;
    var step = (2 * Math.PI) / this.numCircles;
    var offset = parentSize * offsetSize;
    var radius = (parentSize - offset) * 0.5;
    var fadeIncrement = 1/component.numCircles;
    var startCircle = component.state.startCircle;

    var circlesArray = []; for (var i = 0; i < this.numCircles; i++) { circlesArray.push(i); }
    var circles = circlesArray.map((v) => {
      var style = {
        width: offset,
        height: offset,
        left: (Math.round(parentSize * 0.5 + radius * Math.cos(angle)) - offset * 0.5),
        top: (Math.round(parentSize * 0.5 + radius * Math.sin(angle)) - offset * 0.5),
        opacity: fadeIncrement * startCircle
      };
      angle += step;
      startCircle++;
      if (startCircle > component.numCircles) {
        startCircle = 1;
      }
      
      return (
        <div className="ms-Spinner-circle" style={style} key={v}/>
      );
    });
    
    var label = this.props.label ? <div className="ms-Spinner-label">{this.props.label}</div> : '';

    return (
      <div className="ms-Spinner">
        {circles}
        {label}
      </div>
    )
  }
});

module.exports = Spinner;