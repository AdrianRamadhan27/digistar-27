import './App.css'
import Dashboard from './components/Dashboard'
import EmptyPage from './components/EmptyPage';
import Header from './components/Header'
import LeftBar from './components/LeftBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { navItems } from './data/navItems';
import { useState } from 'react';

function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <div className='font-inter'>
          <Header />
          <div className='flex'>
            <LeftBar expanded={expanded} setExpanded={setExpanded}/>
            <div className={`${expanded ? "ml-60" : "ml-20"} w-full`}>
              <Routes>
                <Route path="/analytics/" element={<Dashboard />} />
                {navItems.map(item => (
                    <Route path={item.path} element={<EmptyPage title={item.title}/>}/>
                ))}
              </Routes>
            </div>
            
            
          </div>

        </div>
       
          
      </Router>

    </>
  )
}

export default App
