import React from 'react';
import { useParams } from 'react-router-dom';
import Youtube from 'react-youtube';

const MovieDetails = () => {
    const params = useParams();

    return (
        <>
            <div className="relative">
                <Youtube
                    videoId={params.idTrailer}
                    className="h-screen w-full"
                    opts={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
        </>
    );
};

export default MovieDetails;
