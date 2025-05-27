import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import helpImage from '../assets/images/helpImage.jpg';
import eventImage from '../assets/images/eventImage.jpg';
import realEstateIamge from '../assets/images/realEstateImage.jpg';
import tradeImage from '../assets/images/tradeImage.jpg';
import transportImage from '../assets/images/transportImage.jpg';

function BrowseEventsCard() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
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
            <img src={eventImage} alt="help image" className="w-full h-50 md:h-145 object-cover" />
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
            <img src={helpImage} alt="help image" className="w-full h-50 md:h-145 object-cover" />
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
              src={realEstateIamge}
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
            <img src={tradeImage} alt="help image" className="w-full h-50 md:h-145 object-cover" />
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
              src={transportImage}
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
      {/* <p>Browse events by category</p>
      <div className="flex flex-col justify-center items-center border-t pt-5">
        <Link
          to="/events?category=event"
          className="relative w-fit hover:text-teal-600 hover:font-bold"
        >
          <img src={eventImage} alt="help image" className="w-60 h-40 object-cover" />
          <p className="absolute bottom-1 left-1 text-white opacity-50 font-bold text-5xl">
            Events
          </p>
        </Link>
        <Link
          to="/events?category=help"
          className="relative w-fit mt-3 hover:text-teal-600 hover:font-bold"
        >
          <img src={helpImage} alt="help image" className="w-60 h-40 object-cover" />
          <p className="absolute bottom-1 left-1 text-white opacity-50 font-bold text-5xl">Help</p>
        </Link>
        <Link
          to="/events?category=real estate"
          className="relative w-fit mt-3 hover:text-teal-600 hover:font-bold"
        >
          <img src={realEstateIamge} alt="help image" className=" w-60 h-40 object-cover" />
          <p className="help absolute bottom-1 left-1 text-white opacity-50 font-bold text-5xl text-left">
            Real <br /> Estate
          </p>
        </Link>
        <Link
          to="/events?category=trade"
          className="relative w-fit mt-3 hover:text-teal-600 hover:font-bold"
        >
          <img src={tradeImage} alt="help image" className="w-60 h-40 object-cover" />
          <p className="help absolute bottom-1 left-1 text-white opacity-50 font-bold text-5xl">
            Trade
          </p>
        </Link>
        <Link
          to="/events?category=transportation"
          className="relative w-fit mt-3 hover:text-teal-600 hover:font-bold"
        >
          <img src={transportImage} alt="help image" className="w-60 h-40 object-cover" />
          <p className="help absolute bottom-1 left-1 text-white opacity-60 font-bold text-5xl text-left">
            Trans-
            <br />
            portation
          </p>
        </Link>

      </div> */}
    </div>
  );
}

export default BrowseEventsCard;
