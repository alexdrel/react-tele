import React = require('react');
import { SlideNav, SlideProps } from './slide-navigation';
import { default as Tele, Target } from '../../src/react-tele';

// Prevents loading of CSS into separate chunk
var swiperCSS = require("swiper_css");

class TestSlide extends React.Component<{val: string, slide?: SlideProps}, { nval?: string }> {
  constructor(props: {val: string}) {
    super(props);
    this.state = {};
  }

  render(): any {
    return (
      <article>

        <Tele.port target={this.props.slide.header} id={this.props.slide.index}>
         <h3>--{this.props.val}--</h3>
        </Tele.port>

        <h1>**{this.props.val}**</h1>
        <div>
          {
            ['A', 'B', 'C'].map(v =>
              <button key={v} onClick={()=> this.setState({nval: v})} className={this.state.nval==v?"active":''}> {v} </button>
            )
          }
        </div>
        <div>
          <button onClick={()=> this.setState({nval: null})}> Clear </button>
        </div>

        {this.state.nval &&
          <Tele.port target={this.props.slide.newSlide} onClose={()=>this.setState({nval: null})} >
            <TestSlide slide={this.props.slide.next()} val={this.props.val + this.state.nval} />
          </Tele.port>
        }
      </article>
    );
  }
}

React.render(
  <SlideNav><TestSlide val=""/></SlideNav>,
  document.getElementById('content')
);