import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import Leaderboard from './pages/leaderboard';
import Layout from './components/layout';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<Leaderboard />} />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);