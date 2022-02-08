import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PageAd from './pages/PageAd';
import AddAd from './pages/AddAd';
import { RequireAuth } from './helpers/requireAuth';

export default () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/sobre' element={
                <RequireAuth>
                    <About/>
                </RequireAuth>
            }/>
            <Route path='/post-an-ad' element={
                <RequireAuth>
                    <AddAd/>
                </RequireAuth>
            }/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/ad/:id' element={<PageAd/>}/>
            <Route path="/404" element={<NotFound/>} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    )
}