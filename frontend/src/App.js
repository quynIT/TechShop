import logo from './logo.svg';
import './App.css';
import SignIn from './pages/auth/Sign_in';
import SignUp from './pages/auth/Sign_up';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <button className='bg-blue-500 p-4 '>
    //       Submit
    //     </button>
    //   </header>
    // </div>
    <SignIn/>
  );
}

export default App;
