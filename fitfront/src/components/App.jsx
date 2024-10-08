import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';
import { Exercises } from './Exercises';
import { Routines } from './Routines';
import { Meals } from './Meals';

export function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('logged');
        setIsLoggedIn(loggedInStatus === 'true');

        const handleStorageChange = () => {
            const updatedStatus = localStorage.getItem('logged');
            setIsLoggedIn(updatedStatus === 'true');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                <Route path='/exercises' element={isLoggedIn ? <Exercises /> : <Navigate to="/login" />} />
                <Route path='/routines' element={isLoggedIn ? <Routines /> : <Navigate to="/login" />} />
                <Route path='/meals' element={isLoggedIn ? <Meals /> : <Navigate to="/login" />} />
                <Route path='*' element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}
