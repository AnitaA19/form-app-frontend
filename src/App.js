import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTemplate from './pages/CreateTemplate';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-template" element={<CreateTemplate />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
