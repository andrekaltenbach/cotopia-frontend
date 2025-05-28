import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function BrowseEventsCard() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <div className="card">
      <p className="mb-5 w-full text-center">Browse events by category</p>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        //autoPlay={this.props.deviceType !== 'mobile' ? true : false}
        autoPlay={true}
        autoPlaySpeed={3500}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        //deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div>
          <Link
            to="/events?category=event"
            className="relative w-fit hover:text-teal-600 hover:font-bold"
          >
            <img
              src="/images/eventImage.jpg"
              alt="help image"
              className="w-full h-50 md:h-145 object-cover"
            />
            <p className="absolute bottom-3 w-full text-left ml-2 text-white opacity-70 font-bold text-5xl">
              Events
            </p>
          </Link>
        </div>
        <div>
          <Link
            to="/events?category=help"
            className="relative w-fit mt-3 hover:text-teal-600 hover:font-bold"
          >
            <img
              src="/images/helpImage.jpg"
              alt="help image"
              className="w-full h-50 md:h-145 object-cover"
            />
            <p className="absolute bottom-3 w-full text-left ml-2 text-white opacity-70 font-bold text-5xl">
              Help
            </p>
          </Link>
        </div>
        <div>
          <Link
            to="/events?category=real estate"
            className="relative w-fit mt-3 hover:text-teal-600 hover:font-bold"
          >
            <img
              src="/images/realEstateImage.jpg"
              alt="help image"
              className=" w-full h-50 md:h-145 object-cover"
            />
            <p className="help absolute bottom-3 w-full text-left ml-2 text-white opacity-70 font-bold text-5xl">
              Real <br /> Estate
            </p>
          </Link>
        </div>
        <div>
          <Link
            to="/events?category=trade"
            className="relative w-fit mt-3 hover:text-teal-600 hover:font-bold"
          >
            <img
              src="/images/tradeImage.jpg"
              alt="help image"
              className="w-full h-50 md:h-145 object-cover"
            />
            <p className="help absolute bottom-3 w-full text-left ml-2 text-white opacity-70 font-bold text-5xl">
              Trade
            </p>
          </Link>
        </div>
        <div>
          <Link
            to="/events?category=transportation"
            className="relative w-fit mt-3 hover:text-teal-600 hover:font-bold"
          >
            <img
              src="/images/transportImage.jpg"
              alt="help image"
              className="w-full h-50 md:h-145 object-cover"
            />
            <p className="help absolute bottom-3 w-full text-left ml-2 text-white opacity-70 font-bold text-5xl">
              Trans-
              <br />
              portation
            </p>
          </Link>
        </div>
      </Carousel>
    </div>
  );
}

export default BrowseEventsCard;
