import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { GetPortfolio } from '../GetPortfolio/GetPortfolio';
import { GetWorkers } from '../GetWokers/GetWorkers';
import { UpdateProfile } from '../UpdateProfile/UpdateProfile';
import { Appointments } from '../Appointments/Appointments';  
import { CreateAppointment } from '../CreateAppointment/CreateAppointment';
import { UpdateAppointment } from '../UpdateAppointment/UpdateAppointment';
import { GetAllUsers } from '../GetAllUsers/GetAllUsers';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/portfolio" element={<GetPortfolio />}/>
                <Route path="/workers" element={<GetWorkers />}/>
                <Route path="/updateProfile" element={<UpdateProfile />}/>
                <Route path="/appointments" element={<Appointments />}/>
                <Route path="/createAppointment" element={<CreateAppointment />}/>
                <Route path="/updateAppointment" element={<UpdateAppointment />}/>
                <Route path="/getAllUsers" element={<GetAllUsers />}/>
            </Routes>
         </>
     )
}