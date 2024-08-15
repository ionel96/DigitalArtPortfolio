import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PortfolioList from './components/PortfolioList';
import AddEditWork from './components/AddEditWork';
import Footer from './components/Footer';
import EditWork from './components/EditWork';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PortfolioList />} />
          <Route path="/add-edit-work" element={<AddEditWork />} />
          <Route path="/edit/:id" element={<EditWork />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
