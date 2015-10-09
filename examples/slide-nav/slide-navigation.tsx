/// <reference path="./reference.d.ts" />

import React = require('react');
import Swiper = require('swiper');
import { default as Tele, Target } from '../../src/react-tele';

// export interface SlideProps {
//   sn?: SlideNav;
//   slideIndex?: number;

//   header?: React.ReactChild;

//   // TS typing hack
//   children?: React.ReactChildren;
// }

// export interface SlideState {
//   childSlide?: string;
//   suspendSwipe?: boolean;
// }


// /**
// * Slide can be used as a wrapper for unaware component (being unaware means it does not open new slides nor control own header) or
// * as a base class for slide aware component which may/has to override renderHeader, renderChild and renderSlide (for main content).
// * It case of inheritance make sure to call super.componentDidUpdate.
// */
// export class Slide<P extends SlideProps, S extends SlideState> extends React.Component<P, S> {
//   constructor(props: P) {
//     super(props);
//     this.state = {} as S;
//   }

//   setOpenState(childSlide: string, state?: any) {
//     if (childSlide) {
//       this.newSlide = true;
//       this.setState({ childSlide } as any as S);
//     } else {
//       //this.updateSlider = true;
//       this.props.sn.slideTo(this.props.slideIndex);
//     }
//   }

//   newSlide: boolean;
//   updateSlider: boolean;

//   componentDidMount() {
//     this.updateHeader();
//   }

//   componentDidUpdate() {
//     this.updateHeader();

//     if(this.newSlide) {
//       this.newSlide = false;
//       this.props.sn.newSlide(() => { this.updateSlider=true; this.setState({ childSlide: null} as any as S);  } );
//     } else if(this.updateSlider) {
//       this.updateSlider = false;
//       this.props.sn.update();
//     }
//   }

//   renderSlide() : React.ReactFragment {
//     return this.props.children;
//   }

//   renderActiveChild() {
//     if(this.state.childSlide) {
//       var slide = this.renderChild(this.state.childSlide);

//       return slide && React.cloneElement( slide as any, { sn: this.props.sn, slideIndex: (this.props.slideIndex||0) + 1 });
//     }
//   }

//   renderChild(child: string) : React.ReactFragment {
//     return null;
//   }

//   renderHeader() {
//     return this.props.header;
//   }

//   updateHeader() {
//     this.props.sn.setHeader(this.props.slideIndex || 0, this.renderHeader());
//   }

//   render() {
//     return (
//       <section className="swiper-wrapper" >
//         <div className={ "slide-nav swiper-slide" + (this.state.suspendSwipe ?" swiper-no-swiping":'')}>
//           {this.renderSlide()}
//         </div>

//         { this.state.childSlide && this.renderActiveChild() }
//       </section>
//     );
//   }
// }


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

  render() {
    return (
          <header className="page-header">
            { this.state.slideIndex>0 ?
                <button className="back-button" onClick={this.props.back}></button>
              :
                this.props.close && <button className="close-button" onClick={this.props.close}></button>
            }
            { this.state.header }
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

    this.state = { slides: [
      React.cloneElement(React.Children.only(this.props.children) as any,
          { sn: this, port: this.newPort })
    ]};
  }

  swiper: Swiper;
  header: SlideHeader;

  disposed = false;
  inTransition = false;

  componentWillMount() {
  }

  componentDidMount() {
    require.ensure(['swiper', "swiper_css"], (require) => {
      if(this.disposed)
        return;

      var Swiper = require('swiper');
      this.swiper = new Swiper((this.refs['swiperContainer'] as any).getDOMNode(), {
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
        //this.refs.header.setState({ backButton: this.swiper.activeIndex >0 , header: this.headers[this.swiper.activeIndex] });
      });

      this.swiper.on("slideChangeStart", () => {
        if(!this.disposed) {
          // this.header.setState({ slideIndex: this.swiper.activeIndex , header: this.headers[this.swiper.activeIndex] });
        }
        this.inTransition = true;
      });

    },"ui");
    //this.header.setState({ slideIndex: 0, header: this.headers[0] });
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

  componentDidUpdate() {
    if(this.swiper) {
      this.swiper.update();
      this.swiper.slideNext();
    }
  }

  headers: React.ReactChild[] = [];

  setHeader(slideIndex: number, header: React.ReactChild) {
    this.headers[slideIndex] = header;
    if(this.swiper && this.swiper.activeIndex == slideIndex) {
      this.header.setState({ slideIndex , header: this.headers[this.swiper.activeIndex] });
    }
  }

  update = () => this.swiper && this.swiper.update();
  back = () => this.swiper && this.swiper.slidePrev();


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
            <div className="swiper-pagination"></div>

            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
      </div>
    );
  }
}
