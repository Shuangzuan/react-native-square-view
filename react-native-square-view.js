'use strict';

var React = require('react-native');

var {
  View
} = React;

var SquareView = React.createClass({
  getInitialState: function() {
    return {
      width: 0,
      height: 0,
      direction: 'row' // 'column' and 'row'
    };
  },
  render: function() {
    var square = (
      <View
        {...this.props}
        style={
          [this.props.style,
          {width: this.state.width, height: this.state.height}]
        }
        onLayout={event => {
          var {width, height} = event.nativeEvent.layout;
          var sideLength = Math.max(width, height);

          if (sideLength) {
            this.setState({width: sideLength, height: sideLength});
          } else {
            this.setState({direction: 'column'});
          }
        }}>
        {this.props.children}
      </View>
    );

    switch (this.state.direction) {
      case 'column': return square;
      case 'row': return (<View style={{backgroundColor: 'transparent'}}>{square}</View>);
      default: return null;
    }
  }
});

module.exports = SquareView;