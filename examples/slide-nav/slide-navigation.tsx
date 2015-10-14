/// <reference path="./reference.d.ts" />

import React = require('react');
import Swiper = require('swiper');
import { default as Tele, Target, Selector, PortalTarget } from '../../src/react-tele';

export interface SlideProps {
  index: number;
  header: PortalTarget;
  newSlide: PortalTarget;

  next(): SlideProps;
}

export interface SlideHeaderProps {
  back?: Action;
  close?: Action;

  // TS typing hack
  ref?: string | ((component: SlideHeader) => any);
}

export interface SlideHeadeState {
  header?: React.ReactChild;
  slideIndex?: number;
}

/**
* Render Slide Header
*/
export class SlideHeader extends React.Component<SlideHeaderProps, SlideHeadeState > {

  constructor(props: SlideHeaderProps){
    super(props);

    this.state = {};
  }

  selector: Selector;

  render() {
    return (
      <header className="page-header">
        { this.state.slideIndex>0 ?
            <button className="back-button" onClick={this.props.back}></button>
          :
            this.props.close && <button className="close-button" onClick={this.props.close}></button>
        }
        <Selector selector={this.state.slideIndex} ref={(e:Selector) => this.selector = e }/>
      </header>
    );
  }
}

type Action = ()=> void;

interface SlideNavProps {
   close?: Action;
   children?: any;
}

interface SlideNavState {
   slides?: React.ReactNode[];
}

/**
* Creates Slider Navigation stack, requires content - the single Slide to start the navigation stack.
*/
export class SlideNav extends React.Component<SlideNavProps, SlideNavState> {

  constructor(props: SlideNavProps){
    super(props);

    var slide: SlideProps = {
      index:0,
      newSlide: this.newPort,
      header: this.headerPort,
      next: function(): SlideProps {  return { index: this.index+1, newSlide: this.newSlide, header: this.header, next: this.next } }
    };

    this.state = {
      slides: [ React.cloneElement(React.Children.only(this.props.children) as any, { slide }) ]
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

  newPort = () => {
    return new Promise((resolve) => {
      this.state.slides.push(<Tele.target ref={(r: Target) => resolve(r) }/>);
      this.setState({});
    });
  }

  headerPort = () => {
    return this.header.selector;
  }

  componentDidUpdate() {
    if(this.swiper) {
      this.swiper.update();
      this.swiper.slideNext();
    }
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
        <SlideHeader ref={ (header) => this.header = header } back={this.back} close={this.props.close}/>

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
