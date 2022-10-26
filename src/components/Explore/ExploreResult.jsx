import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Loader';
import MovieCard from '../MovieCard';
import { getExploreMovie } from '../../apis';

const ExploreMovieResult = ({ pages }) => {
    return (
        <>
            <div className="grid grid-cols-sm gap-y-10 gap-x-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 xl:gap-x-5 mt-16 mx-2">
                {pages &&
                    pages.map((page) =>
                        page.results.map((item) => (
                            <div key={item.id}>
                                <MovieCard movie={item} type={'search'}></MovieCard>
                            </div>
                        )),
                    )}
                {!pages &&
                    [...new Array(15)].map((_, index) => (
                        <div key={index}>
                            <Loader className="h-0 pb-[160%]" />
                        </div>
                    ))}
            </div>
        </>
    );
};

const ExploreResult = ({ config }) => {
    const {
        data: movies,
        error: errorMovies,
        fetchNextPage: fetchNextPageMovie,
        hasNextPage: hasNextPageMovie,
    } = useInfiniteQuery(
        ['explore-result-movie', config],
        ({ pageParam = 1 }) => getExploreMovie(pageParam, config),
        {
            getNextPageParam: (lastPage) =>
                lastPage.page + 1 <= lastPage.total_pages ? lastPage.page + 1 : undefined,
        },
    );

    if (errorMovies) return <div>ERROR: {errorMovies.message}</div>;

    return (
        <>
            {movies?.pages.reduce((acc, current) => [...acc, ...current.results], [])
                .length === 0 ? (
                <div>
                    <p className="text-white text-3xl mt-5">Film Not Fond</p>
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={movies?.pages.length || 0}
                    next={() => fetchNextPageMovie()}
                    hasMore={hasNextPageMovie}
                    loader={<div>Loading...</div>}
                    endMessage={<></>}
                >
                    <ExploreMovieResult pages={movies?.pages} />
                </InfiniteScroll>
            )}
        </>
    );
};

export default ExploreResult;
