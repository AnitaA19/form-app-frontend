import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTemplate from './pages/CreateTemplate';
import TemplatesCRUDPage from './pages/TemplateCRUDPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-template" element={<CreateTemplate />} />
                    <Route path="/template-crud/:id" element={<TemplatesCRUDPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
