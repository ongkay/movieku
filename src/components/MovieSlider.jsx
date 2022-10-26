import MovieCard from './MovieCard';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Loader from './Loader';

const MovieSlider = ({ dataMovie, title, type, isLoading }) => {
    // const [queryParams, setQueryParams] = useSearchParams();

    return (
        <div>
            <div className="mt-3">
                <h2 className="text-[#FFFDE3] font-bold md:text-xl ml-4 ">{title}</h2>
            </div>

            <Swiper
                modules={[Navigation]}
                navigation
                slidesPerGroupAuto
                slidesPerView="auto"
                loop
            >
                {isLoading
                    ? [...new Array(15)].map((_, index) => (
                          <SwiperSlide key={index} className="!w-[200px]">
                              <Loader className="!w-[200px] !h-[280px] shadow-sm" />
                          </SwiperSlide>
                      ))
                    : dataMovie?.map((movie) => (
                          <SwiperSlide key={movie.id} className="!w-[200px]">
                              <MovieCard movie={movie} type={type}></MovieCard>
                          </SwiperSlide>
                      ))}
            </Swiper>
        </div>
    );
};

export default MovieSlider;
