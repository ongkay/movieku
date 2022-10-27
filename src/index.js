import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Box } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import App from './App';
import PrivateComponent from './components/PrivateComponent';
import About from './containers/About';
import Login from './containers/Login';
import ChangePass from './containers/ChangePass';
import Home from './containers/Home';
import Explore from './containers/Explore';
import NotFound from './containers/NotFound';
import Pricing from './containers/Pricing';
import Register from './containers/Register';
import Subscribed from './containers/Subscribed';
import MovieDetails from './containers/MovieDetails';

const queryClient = new QueryClient();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/explore" element={<Explore />} />
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />}>
                <Route
                    path="description"
                    element={<Box sx={{ mt: 10 }}>Provides movies in your hand</Box>}
                />
                <Route
                    path="services"
                    element={
                        <Box sx={{ mt: 10 }}>
                            Streaming movies, Indonesian film, and film review.
                        </Box>
                    }
                />
            </Route>
            <Route
                path="indonesian"
                element={<Box sx={{ mt: 10 }}>Halaman indonesian</Box>}
            />
            <Route
                path="pricing"
                element={
                    <PrivateComponent>
                        <Pricing />
                    </PrivateComponent>
                }
            />
            <Route path="subscribed/:plan" element={<Subscribed />} />
            <Route
                path="login"
                element={
                    <PrivateComponent loginOnly={false}>
                        <Login />
                    </PrivateComponent>
                }
            />
            <Route path="changepass" element={
                <PrivateComponent loginOnly={true}>
                    <ChangePass />
                </PrivateComponent>
            } />
            <Route
                path="register"
                element={
                    <PrivateComponent loginOnly={false}>
                        <Register />
                    </PrivateComponent>
                }
            />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/:genre/:movieId" element={<MovieDetails />}></Route> */}
            <Route path="/:genre/:movieId/:idTrailer" element={<MovieDetails />}></Route>
        </Route>,
    ),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
);
