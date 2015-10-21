var React = require('react');
var { Portal } = require('react-tele');
var Timer = require('./timer');


class Officer extends React.Component {
  constructor(props) {
    this.state = { onBoard: true, acting: false };
  }

  render() {
    return (
    <div style={ { padding: "0 0 20px 30px", borderBottom: "solid 1px" } }>

      <span>{this.props.name} : </span>

      <button onClick={()=>this.setState({onBoard: !this.state.onBoard })}>
        Beam me {this.state.onBoard? "up" : "down" }, Scotty!
      </button>
      <br/>

      { this.props.captain || <button onClick={()=>this.setState({acting: !this.state.acting}) }> Acting Captain </button> }

      {this.state.onBoard ?
        <div>On Board
        </div>
       :
        <Portal site={this.props.beam} onClose={() => this.setState({onBoard:true})}>
          <div>
            {this.props.captain || this.state.acting ? "Captain " : "" }
            {this.props.name}
            <span> <Timer/> seconds ago  </span>
          </div>
        </Portal>
      }
    </div>
    );
  }
}

module.exports = Officer;