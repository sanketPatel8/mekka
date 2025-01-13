"use client";
import Calender from "@/components/common/dropdownSearch/Calender";
import Location from "@/components/common/dropdownSearch/Location";
import TourType from "@/components/common/dropdownSearch/TourType";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NumberOfTravellers from "@/components/common/dropdownSearch/NumberOfTravellers";
import { DateObject } from "react-multi-date-picker";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { showErrorToast } from "@/app/utils/tost";
import { post } from "@/app/utils/api";
import HeroSearch from "@/components/HeroSearch";
import { useTranslation } from "@/app/context/TranslationContext";

const slides = [
  {
    id: 1,
    imageSrc: "/img/hero/7/slide2.png",
    subtitle: "plan your Umrah now with mekkabooking",
    title: "Experience an extraordinary journey",
    title2: "intense & certainly unforgettable",
  },
  {
    id: 2,
    imageSrc: "/img/hero/7/slide3.png",
    subtitle: "now your Umrah journey",
    title: "search, compare and fly",
    title2: "on mekkabooking.com",
  },
  {
    id: 3,
    imageSrc: "/img/hero/7/slide1.png",
    subtitle: "on mekkabooking.com you can find almost all",
    title: "Umrah offers from Germany",
    title2: "from almost all providers",
  },

  // {
  //   id: 4,
  //   imageSrc: "/img/hero/7/image 4.jpg",
  //   subtitle:
  //     "Search, compare and book 15,000+ multiday tours all over the world.",
  //   title: "Tours and Trip packages",
  //   title2: "",
  // },
  // {
  //   id: 5,
  //   imageSrc: "/img/hero/7/image 1.jpg",
  //   subtitle:
  //     "Search, compare and book 15,000+ multiday tours all over the world.",
  //   title: "Tours and Trip packages",
  //   title2: "",
  // },
];

export default function Hero7() {
  const router = useRouter();
  const [currentActiveDD, setCurrentActiveDD] = useState("");

  const { location, calender, tourType } = useGlobalState();

  useEffect(() => {
    setCurrentActiveDD("");
  }, [location, calender, tourType, setCurrentActiveDD]);

  const dropDownContainer = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setCurrentActiveDD("");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const { translate } = useTranslation();

  return (
    <>
      <section className="hero -type-7">
        <div className="hero__shape"></div>

        <div className="hero__slider js-section-slider">
          <div className="swiper-wrapper">
            <Swiper
              className="w-100"
              modules={[Navigation, Autoplay]}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              navigation={{
                prevEl: ".js-sliderHero-prev",
                nextEl: ".js-sliderHero-next",
              }}
              breakpoints={{
                500: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 1,
                },
                1200: {
                  slidesPerView: 1,
                },
              }}
            >
              {slides.map((elm, i) => (
                <SwiperSlide key={i}>
                  <div className="hero__bg">
                    <Image
                      width={1920}
                      height={160}
                      src={elm.imageSrc}
                      alt="background"
                    />
                  </div>

                  <div className="bg-color">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-md-10">
                          <div className="hero__content">
                            {/* <h1
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="hero__subtitle text-white mb-5 md:mb-5"
                          >
                            {translate(elm.subtitle)}
                          </h1>

                          <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="hero__title text--color-accent-1"
                          >
                            <h2 className="text_50 text-xs-center text-sm-left text-md-left text-lg-left text-xl-left">
                              {translate(elm.title)}
                            </h2>
                          </div> */}

                            <div className="slicontent">
                              <p className="sliSubTitle">
                                {translate(elm.subtitle)}
                              </p>
                              <h1
                                className={`sliTitle ${
                                  elm.id == "2"
                                    ? "slider-slide-2-heading-change"
                                    : ""
                                }`}
                              >
                                {translate(elm.title)}
                              </h1>
                              <p className="sliTitle2">
                                {translate(elm.title2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hero__nav d-flex mt-40">
            <button className="button -outline-white rounded-full size-72 flex-center text-white js-sliderHero-prev">
              <i className="icon-arrow-left text-20"></i>
            </button>

            <button className="button -outline-white rounded-full size-72 flex-center text-white ml-10 js-sliderHero-next">
              <i className="icon-arrow-right text-20"></i>
            </button>
          </div>
        </div>

        <div className="hero__filter">
          <div
            ref={dropDownContainer}
            className="searchForm -type-1 shadow-1 rounded-200"
          >
            <HeroSearch CustomClass="rounded-200" />
          </div>
        </div>
      </section>
    </>
  );
}

// "use client";
// import Calender from "@/components/common/dropdownSearch/Calender";
// import Location from "@/components/common/dropdownSearch/Location";
// import TourType from "@/components/common/dropdownSearch/TourType";
// import { useRouter } from "next/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import NumberOfTravellers from "@/components/common/dropdownSearch/NumberOfTravellers";
// import { DateObject } from "react-multi-date-picker";
// import { useGlobalState } from "@/app/context/GlobalStateContext";
// import { showErrorToast } from "@/app/utils/tost";
// import { post } from "@/app/utils/api";
// import HeroSearch from "@/components/HeroSearch";
// import { useTranslation } from "@/app/context/TranslationContext";
// import { POST } from "@/app/utils/api/post";

// const slides = [
//   {
//     id: 1,
//     imageSrc: "/img/hero/7/slide2.png",
//     subtitle: "plan your Umrah now with mekkabooking",
//     title: "Experience an extraordinary journey",
//     title2: "intense & certainly unforgettable",
//   },
//   {
//     id: 2,
//     imageSrc: "/img/hero/7/slide3.png",
//     subtitle: "now your Umrah journey",
//     title: "search, compare and fly",
//     title2: "on mekkabooking.com",
//   },
//   {
//     id: 3,
//     imageSrc: "/img/hero/7/slide1.png",
//     subtitle: "on mekkabooking.com you can find almost all",
//     title: "Umrah offers from Germany",
//     title2: "from almost all providers",
//   },

//   // {
//   //   id: 4,
//   //   imageSrc: "/img/hero/7/image 4.jpg",
//   //   subtitle:
//   //     "Search, compare and book 15,000+ multiday tours all over the world.",
//   //   title: "Tours and Trip packages",
//   //   title2: "",
//   // },
//   // {
//   //   id: 5,
//   //   imageSrc: "/img/hero/7/image 1.jpg",
//   //   subtitle:
//   //     "Search, compare and book 15,000+ multiday tours all over the world.",
//   //   title: "Tours and Trip packages",
//   //   title2: "",
//   // },
// ];

// export default function Hero7() {
//   const router = useRouter();
//   const [currentActiveDD, setCurrentActiveDD] = useState("");
//   const [sliderData, setSliderData] = useState([]);
//   const { location, calender, tourType } = useGlobalState();
//   const [autoplayDelay, setAutoplayDelay] = useState(6000);

//   useEffect(() => {
//     setCurrentActiveDD("");
//   }, [location, calender, tourType, setCurrentActiveDD]);

//   const dropDownContainer = useRef();

//   useEffect(() => {
//     const handleClick = (event) => {
//       if (
//         dropDownContainer.current &&
//         !dropDownContainer.current.contains(event.target)
//       ) {
//         setCurrentActiveDD("");
//       }
//     };

//     document.addEventListener("click", handleClick);

//     return () => {
//       document.removeEventListener("click", handleClick);
//     };

//   }, []);

//   useEffect(() => {
//     fetchSlider()
//   },[])

//   const fetchSlider = async() => {

//     const response = await POST.request({url:"home_slider"});

//     console.log(response);

//     const firstSlideSpeed = response.Data[0]?.speed > 0  ? response.Data[0]?.speed : 6000; // Default to 6000 if speed is not provided
//     setAutoplayDelay(firstSlideSpeed);

//     setSliderData(response.Data);

//   }

//   const { translate } = useTranslation();

//   return (
//     <>
//       <section className="hero -type-7">
//         <div className="hero__shape"></div>

//         <div className="hero__slider js-section-slider">
//           <div className="swiper-wrapper">
//             <Swiper
//               className="w-100"
//               modules={[Navigation, Autoplay]}
//               autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
//               navigation={{
//                 prevEl: ".js-sliderHero-prev",
//                 nextEl: ".js-sliderHero-next",
//               }}
//               breakpoints={{
//                 500: {
//                   slidesPerView: 1,
//                 },
//                 768: {
//                   slidesPerView: 1,
//                 },
//                 1024: {
//                   slidesPerView: 1,
//                 },
//                 1200: {
//                   slidesPerView: 1,
//                 },
//               }}
//             >
//               {sliderData.map((elm, i) => (
//                 <SwiperSlide key={elm.id}>
//                   <div className="hero__bg">
//                     <Image
//                       width={1920}
//                       height={160}
//                       src={elm.file_path}
//                       alt="background"
//                     />
//                   </div>

//                   <div className="bg-color">
//                     <div className="container">
//                       <div className="row">
//                         <div className="col-lg-12 col-md-10">
//                           <div className="hero__content">
//                             <div className="slicontent">
//                               <p className="sliSubTitle">{translate(elm.sub_headline)}</p>
//                               <h1 className={`sliTitle ${elm.id == '2' ? "slider-slide-2-heading-change" : ""}`}>{translate(elm.headline)}</h1>
//                               <p className="sliTitle2">{translate(elm .title2)}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}

//             </Swiper>
//           </div>

//           <div className="hero__nav d-flex mt-40">
//             <button className="button -outline-white rounded-full size-72 flex-center text-white js-sliderHero-prev">
//               <i className="icon-arrow-left text-20"></i>
//             </button>

//             <button className="button -outline-white rounded-full size-72 flex-center text-white ml-10 js-sliderHero-next">
//               <i className="icon-arrow-right text-20"></i>
//             </button>
//           </div>
//         </div>

//         <div className="hero__filter">
//           <div
//             ref={dropDownContainer}
//             className="searchForm -type-1 shadow-1 rounded-200"
//           >
//             <HeroSearch CustomClass="rounded-200" />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
