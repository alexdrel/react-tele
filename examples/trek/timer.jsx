var React = require('react');

class Timer extends React.Component {
  constructor(props) {
    this.state = { sec: 0 };
  }

  tick() {
    this.setState( { sec: this.state.sec + 1 });
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <span>{this.state.sec}</span>
  }
}

module.exports = Timer;