
// import {BrowserRouter, Routes, Route} from "react-router-dom";
// import AddJob from './Pages/hcdPages/AddJob';
// import Dashboard from './Pages/hcdPages/Dashboard';
// import Form from './Pages/form/Form';
import PostedJob from "./Pages/PostedJob";


export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/dashboard" element={<Dashboard/>}/>
    //     <Route path="/" element={<AddJob/>}/>
    //   </Routes>
    // </BrowserRouter> 
    <div>
      <PostedJob/>
    </div>
  );
}
