import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import theme from './themes/theme';
import { MovieModalSelector } from './store/movie';
import MovieModal from './components/MovieModal';

const App = () => {
    const { showModal } = MovieModalSelector();
    return (
        <>
            {showModal && (
                <div className="absolute">
                    <div className="fixed top-0 left-0 bg-black w-full h-full flex items-center justify-center bg-opacity-50 z-50">
                        <MovieModal />
                    </div>
                </div>
            )}
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Navbar />
                    <Outlet />
                </div>
            </ThemeProvider>
        </>
    );
};

export default App;
