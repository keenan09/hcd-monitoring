
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddJob from './Pages/hcdPages/AddJob';
import Dashboard from './Pages/hcdPages/Dashboard';
import PostedJob from "./Pages/PostedJob";
// import Form from './Pages/form/Form';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<AddJob/>}/>
        <Route path="/r17-career" element={<PostedJob/>}/>
        {/* <Route path="/form-apply" element={<Form/>}/> */}
      </Routes>
    </BrowserRouter> 
    
  );
}
