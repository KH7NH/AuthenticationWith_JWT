// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'

const ProtectedRoute = () =>{
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if(!user) return <Navigate to="/login" replace={true} />
  return <Outlet />
}
const UnauthorizedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (user) return <Navigate to="/dashboard" replace={true} />
  return <Outlet />
}

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to="/login" replace={true} />
      } />

      <Route element={<UnauthorizedRoutes />}>
        {/* <Outlet /> của react-router-dom sẽ chạy vào các child route trong này */}
        <Route path='/login' element={<Login />} />
        {/* Đoạn này sau này sẽ còn nhiều route nữa để viết xác thực */}
      </Route>

      <Route element={<ProtectedRoute />}>
      {/* <Outlet /> của react-router-dom sẽ chạy vào các child route trong này */}
        <Route path='/dashboard' element={<Dashboard />} />
        {/* Đoạn này sau này sẽ còn nhiều route nữa để viết xác thực */}
      </Route>
      
    </Routes>
  )
}

export default App
