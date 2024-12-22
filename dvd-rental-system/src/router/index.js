import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//import LayoutAdmin from './pages/layouts/LayoutAdmin';
import LayoutAdmin from '../components/layouts/Admin';
import LayoutUser from '../components/layouts/User';
import MainHome from '../pages/Home';
import Login from '../pages/Login';
import RegisterPage from '../pages/Register';
import NoPage from '../pages/NoPage';
//admin
import AdminHome from '../pages/admin/Home';
import AdminAddMovie from '../pages/admin/AddMovie';
import AdminEditMovies from '../pages/admin/EditMovies';
import AdminEditMovie from '../pages/admin/EditMovie';
import AdminOrder from '../pages/admin/Order';
import AdminUsers from '../pages/admin/Users';
//user
import UserHome from '../pages/user/Home';
import MovieDetail from '../pages/user/MovieDetail';
import Return from '../pages/user/ReturnMovie';
import UserHistory from '../pages/user/UserHistory';
import SearchPage from "../pages/user/Search";
import UserCategoryPage from "../pages/user/CategoryPage";
import UserMovieSortPage from "../pages/user/MovieSortPage";

function Routers() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/user" element={<LayoutUser />} >
                <Route index  element={<UserHome />} />
                <Route path="/user/movies" element={<UserHome />} />
                <Route path="/user/movies/search/:name" element={<SearchPage />} />
                <Route path="/user/movies/category/:name" element={<UserCategoryPage />} />
                <Route path="/user/movies/sort/:key" element={<UserMovieSortPage />} />
                <Route path="/user/movies/:id" element={<MovieDetail />} />
                <Route path="/user/return/:id/" element={<Return />} />
                <Route path="/user/history" element={<UserHistory />} />
                <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="/admin" element={<LayoutAdmin />} >
                <Route index  element={<AdminHome />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/orders" element={<AdminOrder />} />
                <Route path="/admin/movies/add" element={<AdminAddMovie />} />
                <Route path="/admin/movies/edit" element={<AdminEditMovies/>} />
                    <Route path="/admin/movies/:id/edit" element={<AdminEditMovie/>} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    </Router>
  );
}

export default Routers;