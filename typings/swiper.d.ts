// Type definitions for Swiper 2.0.0
// Project: https://github.com/nolimits4web/Swiper
// Definitions by: Sebastián Galiano <https://github.com/sgaliano/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


interface SwiperOptions {
    speed?: number;
    autoplay?: number;
    mode?: string;
    loop?: boolean;
    loopAdditionalSlides?: number;
    slidesPerView?: any;
    slidesPerGroup?: number;
    calculateHeight?: boolean;
    updateOnImagesReady?: boolean;
    releaseFormElements?: boolean;
    watchActiveIndex?: boolean;
    visibilityFullFit?: boolean;
    autoResize?: boolean;
    resizeReInit?: boolean;
    DOMAnimation?: boolean;
    resistance?: any;
    noSwiping?: boolean;
    preventLinks?: boolean;
    initialSlide?: number;
    useCSS3Transforms?: boolean;
    spaceBetween?: number;

    // Free Mode and Scroll Container
    freeMode?: boolean;
    freeModeFluid?: boolean;
    scrollContainer?: boolean;
    momentumRatio?: number;
    momentumBounce?: boolean;
    momentumBounceRatio?: number;
    resistanceRatio?: number;

    // Slides offset
    centeredSlides?: boolean;
    offsetPxBefore?: number;
    offsetPxAfter?: number;
    offsetSlidesBefore?: number;
    offsetSlidesAfter?: number;

    // Touch/mouse interactions
    touchRatio?: number;
    simulateTouch?: boolean;
    onlyExternal?: boolean;
    followFinger?: boolean;
    grabCursor?: boolean;
    shortSwipes?: boolean;
    moveStartThreshold?: number;
    threshold?: number;
    
    // Navigation
    keyboardControl?: boolean;
    mousewheelControl?: boolean;

    // Pagination
    pagination?: any;
    paginationClickable?: boolean;
    paginationAsRange?: boolean;
    createPagination?: boolean;

    // Namespace
    wrapperClass?: string;
    slideClass?: string;
    slideActiveClass?: string;
    slideVisibleClass?: string;
    slideElement?: string;
    noSwipingClass?: string;
    paginationElement?: string;
    paginationElementClass?: string;
    paginationActiveClass?: string;
    paginationVisibleClass?: string;

    // Callbacks
    queueStartCallbacks?: boolean;
    queueEndCallbacks?: boolean;
    onTouchStart?: (swiper: Swiper) => void;
    onTouchMove?: (swiper: Swiper) => void;
    onTouchEnd?: (swiper: Swiper) => void;
    onSlideReset?: (swiper: Swiper) => void;
    onSlideChangeStart?: (swiper: Swiper) => void;
    onSlideChangeEnd?: (swiper: Swiper) => void;
    onSlideClick?: (swiper: Swiper) => void;
    onSlideTouch?: (swiper: Swiper) => void;
    onImagesReady?: (swiper: Swiper) => void;
    onMomentumBounce?: (swiper: Swiper) => void;
    onResistanceBefore?: (swiper: Swiper, distance: any) => void;
    onResistanceAfter?: (swiper: Swiper, distance: any) => void;
    preventLinksPropagation?: boolean;
    touchMoveStopPropagation?: boolean;

    // Slides Loader
    loader?: {
        slides?: any[];
        slidesHTMLType?: string;
        surroundGroups?: number;
        logic?: string;
        loadAllSlides?: boolean;
    };

    // Plugins
    scrollbar?: SwiperScrollbarOptions;
}

interface SwiperScrollbarOptions {
    container: string;          // Default: '.swiper-scrollbar'
    draggable?: boolean;        // Default: true
    hide?: boolean;             // Default: true
    snapOnRelease?: boolean;    // Default: false
}

declare class SwiperSlide {
    append(): SwiperSlide;
    clone(): SwiperSlide;
    getWidth(): number;
    getHeight(): number;
    getOffset(): { top: number; left: number; };
    insertAfter(index: number): SwiperSlide;
    prepend(): SwiperSlide;
    remove(): void;
}

declare class Swiper {
    constructor(container: string, options?: SwiperOptions);
    constructor(container: Element, options?: SwiperOptions);

    // Properties
    width: number;
    height: number;
    params: any;
    positions: any;
    animating: boolean;

    // Feature detection
    support: {
        touch: boolean;
        transforms: boolean;
        transforms3d: boolean;
        transitions: boolean;
    };

    // Browser detection
    browser: {
        ie8: boolean;
        ie10: boolean;
    };

    // Navigation
    activeIndex: number;
    activeLoopIndex: number;
    activeLoaderIndex: number;
    previousIndex: number;
    slideNext(runCallbacks?: boolean, speed?: number): boolean;
    slidePrev(runCallbacks?: boolean, speed?: number): boolean;
    slideTo(index: number, speed?: number, runCallbacks?: boolean): boolean;
    activeSlide(): SwiperSlide;
    updateActiveSlide(index: number): void;
    update(reset?: boolean): void;

    // Events
    touches: any;
    isTouched: boolean;
    clickedSlideIndex: number;
    clickedSlide: SwiperSlide;
    wrapperTransitionEnd(callback: () => void, permanent: boolean): void;

    // Init/reset
    destroy(removeResizeEvent?: boolean): void;
    reInit(forceCalcSlides?: boolean): void;
    resizeFix(reInit?: boolean): void;

    // Autoplaying
    autoplay: boolean;
    startAutoplay(): void;
    stopAutoplay(): void;

    // Other methods
    getWrapperTranslate(axis: string): number;  // 'x' or 'y'
    setWrapperTranslate(x: number, y: number, z: number): void;
    setWrapperTransition(duration: any): void;

    // Slides API
    slides: SwiperSlide[];
    createSlide(html: string, slideClassList?: string, element?: string): SwiperSlide;
    appendSlide(html: string, slideClassList?: string, element?: string): SwiperSlide;
    appendSlide(slideInstance: HTMLElement): SwiperSlide;
    prependSlide(html: string, slideClassList?: string, element?: string): SwiperSlide;
    prependSlide(slideInstance: HTMLElement): SwiperSlide;
    insertSlideAfter(index: number, html: string, slideClassList?: string, element?: string): SwiperSlide;
    insertSlideAfter(index: number, slideInstance: HTMLElement): SwiperSlide;
    removeSlide(index: number): boolean;
    removeLastSlide(): boolean;
    removeAllSlides(): void;
    getSlide(index: number): SwiperSlide;
    getLastSlide(): SwiperSlide;
    getFirstSlide(): SwiperSlide;
    on(eventName: string, callback: any): void;
    attachEvents(): void;
    detachEvents(): void;
}

declare module "swiper" {
    export = Swiper;
}
