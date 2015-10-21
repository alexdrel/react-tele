var React = require('react');
var Officer = require('./officer');
var { Portal, Site } = require('react-tele');



class Trek extends React.Component {
  constructor(props) {
    this.beam=this.beam.bind(this);
    this.state = { teleport: false };
  }

  beam() {
    if(this.state.teleport) {
      return this.refs["beam"];
    } else {
      if(!this.updatePromise) {
        this.updatePromise=new Promise((resolve)=> {
         this.updatePromiseResolve = resolve;
         this.setState({ teleport: true });
       });
      }
      return this.updatePromise;
    }
  }

  componentDidUpdate() {
    var beam = this.refs["beam"];
    if(beam){
      this.updatePromiseResolve && this.updatePromiseResolve(beam);
    } else {
      this.updatePromise = null;
      this.updatePromiseResolve = null;
    }
  }

  render() {
    return <div>
      { this.state.teleport &&
        <section className="Planet">
          Last beamed:
          <Site ref="beam"/>
          <br/>
          <button onClick={()=>this.setState({teleport: false })}>Close</button>
        </section>
      }
      <section className="Enterprise" style={ { paddingTop: "30px" } }>
        <Officer name="James T. Kirk" captain={true} beam={this.beam}/>
        <Officer name="Spock" beam={this.beam}/>
        <Officer name="Sulu"  beam={this.beam}/>
        <Officer name="McCoy" beam={this.beam}/>
      </section>
    </div>;
  }
};

React.render(
  <Trek/>,
  document.getElementById('content')
);

