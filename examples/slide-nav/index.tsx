import React = require('react');
import { Header, Slide, SlideNav, SlideProps } from './slide-navigation';
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

        <Header slide={this.props.slide}>
         <h3>--{this.props.val}--</h3>
        </Header>

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
          <Slide slide={this.props.slide} onClose={()=>this.setState({nval: null})} >
            <TestSlide val={this.props.val + this.state.nval} />
          </Slide>
        }
      </article>
    );
  }
}

React.render(
  <SlideNav><TestSlide val=""/></SlideNav>,
  document.getElementById('content')
);