
import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { GetPortfolio } from '../GetPortfolio/GetPortfolio';
import { GetWorkers } from '../GetWokers/GetWorkers';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/tattoos" element={<GetPortfolio />}/>
                <Route path="/workers" element={<GetWorkers />}/>
            </Routes>
         </>
     )
}