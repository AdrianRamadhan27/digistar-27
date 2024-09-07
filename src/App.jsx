
import './App.css'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import LeftBar from './components/LeftBar'

function App() {

  return (
    <>
      <div className='font-inter'>
        <Header />
        <div className='flex'>
          <LeftBar />
          <Dashboard />
        </div>
      </div>
    </>
  )
}

export default App
