import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from '../Loader';
import Main from './Main';

const BannerSlider = ({ dataMovie, type, isLoading }) => {
    return (
        <div>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="relative"
            >
                {isLoading ? (
                    <SwiperSlide className="!w-full">
                        <Loader className="!w-full !h-[400px] shadow-sm" />
                    </SwiperSlide>
                ) : (
                    dataMovie.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Main movie={movie} type={type}></Main>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
};

export default BannerSlider;
