import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateProblem from './pages/CreateProblem';
import PrivateRoute from './components/PrivateRoute';
import UpdateProblem from './pages/UpdateProblem';
import ProblemPage from './pages/ProblemPage';
import Search from './pages/Search';
export default function App(){
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/search" element ={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/create-problem" element={<CreateProblem />}/>
          <Route path="/update-problem/:problemId" element={<UpdateProblem />}/>
          <Route path="/problem/:problemId" element={<ProblemPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}