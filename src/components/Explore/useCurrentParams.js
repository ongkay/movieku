import { useSearchParams } from 'react-router-dom';

export const SUPPORTED_QUERY = {
    genre: [],
    sort_by: [],
    from: [],
    to: [],
};

export const useCurrentParams = () => {
    const [searchParam] = useSearchParams();

    const currentSearchParams = JSON.parse(JSON.stringify(SUPPORTED_QUERY));
    searchParam.forEach((value, key) => {
        currentSearchParams[key].push(value);
    });

    return [currentSearchParams];
};
