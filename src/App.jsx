import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import DashBoard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Settings from './pages/Settings'
import Account from './pages/Account'
import Users from './pages/Users'
import GlobalStyles from './styles/GlobalStyles'
import AppLayout from './ui/AppLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      // staleTime:60 * 1000,
      staleTime:0,
    }
  }
})

function App() {
  return (

    <QueryClientProvider client={queryClient}>
    <GlobalStyles/>
    <ReactQueryDevtools initialIsOpen={false}/>
    <BrowserRouter>
      <Routes>
      <Route element={<AppLayout/>}>
        <Route index element={<Navigate replace to='dashboard'/>}/> 
        <Route path= 'dashboard' element={<DashBoard/>}/>
        <Route path= 'bookings' element={<Bookings/>}/>
        <Route path= 'cabins' element={<Cabins/>}/>
        <Route path= 'settings' element={<Settings/>}/>
        <Route path= 'account' element={<Account/>}/>
        <Route path= 'users' element={<Users/>}/>
    </Route>
        <Route path= 'login' element={<Login/>}/>
        <Route path= '*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App