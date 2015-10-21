/// <reference path="./reference.d.ts" />

import React = require('react');
import Swiper = require('swiper');
import { Portal, Site, PortalSite } from '../../src/react-tele';

type Action = ()=> void;

export interface SlideProps {
  index: number;
  headerSite: PortalSite;
  newSite: PortalSite;
}

interface SlideHeaderProps {
  onBack?: Action;
  onClose?: Action;

  // TS typing hack
  ref?: (component: SlideHeader) => any;
}

/**
* Render Slide Header
*/
class SlideHeader extends React.Component<SlideHeaderProps, { slideIndex?: number } > {
  constructor(props: SlideHeaderProps){
    super(props);
    this.state = {};
  }

  site: Site;

  render() {
    return (
      <header className="page-header">
        { this.state.slideIndex>0 ?
            <button className="back-button" onClick={this.props.onBack}></button>
          :
            this.props.onClose && <button className="close-button" onClick={this.props.onClose}></button>
        }
        <Site portal={this.state.slideIndex} ref={(e:Site) => this.site = e }/>
      </header>
    );
  }
}

interface SlideNavProps {
   onClose?: Action;
   children?: any;
}

function cloneSlideChild(that: any, slide: SlideProps) {
  return React.cloneElement(React.Children.only(that.props.children) as any, { slide });
}

/**
* Creates Slider Navigation stack, requires content - the single Slide to start the navigation stack.
*/
export class SlideNav extends React.Component<SlideNavProps, { slides?: React.ReactNode[] }> {

  constructor(props: SlideNavProps){
    super(props);

    var slide: SlideProps = {
      index:0,
      newSite: this.newSite,
      headerSite: this.headerSite,
    };

    this.state = {
      slides: [ cloneSlideChild(this, slide) ]
    };
  }

  swiper: Swiper;
  header: SlideHeader;

  disposed = false;
  inTransition = false;

  componentWillMount() {
  }

  componentDidMount() {
    require.ensure(['swiper', 'swiper_css'], (require) => {
      if(this.disposed)
        return;

      var ASwiper: typeof Swiper = require('swiper');
      require('swiper_css');

      this.swiper = new ASwiper((this.refs['swiperContainer'] as any).getDOMNode(), {
        slideClass: "slide-nav",
        resistanceRatio: 0,
        spaceBetween: 20,
        keyboardControl: true,
        preventLinks: true,
        preventLinksPropagation: true,
        touchMoveStopPropagation: true,
        threshold: 30
      });

      this.swiper.on("slideChangeEnd", () => {
        if(this.disposed)
          return;

        if(this.swiper.previousIndex > this.swiper.activeIndex) {
          this.state.slides.splice(this.swiper.activeIndex + 1);
          this.setState({});
        }
        setTimeout(() => { this.inTransition = false; }, 10);
      });

      this.swiper.on("slideChangeStart", () => {
        if(!this.disposed) {
          this.header.setState({ slideIndex: this.swiper.activeIndex });
        }
        this.inTransition = true;
      });

    },"ui");
    this.header.setState({ slideIndex: 0 });
  }

  componentWillUnmount() {
    this.disposed = true;
  }

  componentDidUpdate() {
    if(this.swiper) {
      this.swiper.update();
      this.swiper.slideNext();
    }
  }

  newSite = () => {
    return new Promise((resolve) => {
      this.state.slides.push(<Site ref={(r: Site) => resolve(r) }/>);
      this.setState({});
    });
  }

  headerSite = () => {
    return this.header.site;
  }

  back = () => {
    if(this.swiper) {
      this.swiper.slidePrev();
    }
  }

  onClickCapture = (e: Event) => {
    if(this.inTransition) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render() {
    return (
      <div className="main">
        <SlideHeader ref={ (header) => this.header = header } onBack={this.back} onClose={this.props.onClose}/>

        <div className="swiper-container" ref="swiperContainer" onClickCapture={this.onClickCapture}>
            <div className="swiper-wrapper">
              {
                this.state.slides.map((s,i)=>
                  <div className="slide-nav swiper-slide" key={i}>{s}</div>
                )
              }
            </div>
        </div>
      </div>
    );
  }
}

export class Header extends React.Component<{ slide: SlideProps, children?: any}, {}> {
  render() {
    var { index = 0 , headerSite } = this.props.slide;
    return React.createElement(Portal, { site: headerSite, id: index }, this.props.children);
  }
}

export class Slide extends React.Component<{ slide: SlideProps, onClose: Action, children?: any}, {}> {
  render() {
    var { index = 0 , newSite, headerSite } = this.props.slide;
    index = (+index)+1;
    return React.createElement(Portal, { site: newSite, onClose: this.props.onClose },
             cloneSlideChild(this, { index, newSite, headerSite } ));
  }
}