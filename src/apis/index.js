import tmdb from './tmdb';

export const getHomeMovies = async () => {
    const endpoints = {
        trending: '/trending/movie/day',
        popular: '/movie/popular',
        top_tated: '/movie/top_rated',
        hot: '/trending/movie/day?page=2',
        upcoming: '/movie/upcoming',
    };

    const responses = await Promise.all(
        Object.entries(endpoints).map((endpoint) => tmdb.get(endpoint[1])),
    );

    const data = responses.reduce((final, current, index) => {
        final[Object.entries(endpoints)[index][0]] = current.data.results;

        return final;
    }, {});

    return data;
};

export const getRecommendGenres = async () => {
    const movieGenres = (await tmdb.get('/genre/movie/list')).data.genres;

    return { movieGenres };
};

export const getExploreMovie = async (page, config = {}) => {
    return (
        await tmdb.get('/discover/movie', {
            params: {
                ...config,
                page,
            },
        })
    ).data;
};
