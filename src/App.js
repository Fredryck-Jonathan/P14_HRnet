import React from 'react'
import { BrowserRouter as  Router, Routes, Route} from 'react-router-dom';

//import Header from './layouts/Header';
//import Footer from './layouts/Footer';

import Home from './pages/Home';
import Error from './pages/Error';






function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    )
}
export default App;
