// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import UpdateStatusForm from 'src/views/admin/UpdateStatusForm';
import ProtectedRoute from './ProtectedRoute';
import Profile from 'src/layouts/loading/Proflie';
/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// authentication
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

const EmployeeLists = Loadable(lazy(() => import('../views/admin/EmpLists')));
const Dashboard = Loadable(lazy(() => import('../views/admin/Dashboard')));
const AddNews = Loadable(lazy(() => import('../views/admin/AddNews')));
const NewsLists = Loadable(lazy(() => import('../views/admin/NewsLists')));

const NewsList = Loadable(lazy(() => import('../views/admin/News')));
const LeaveFilter = Loadable(lazy(() => import('../views/admin/LeaveFilter')));

const UserDashboard = Loadable(lazy(() => import('../views/user/Dashboard')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/admin/dashboard" /> },

      {
        path: '/admin/emp-lists',
        element: (
          <ProtectedRoute roles={['admin']}>
            <EmployeeLists />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/dashboard',
        element: (
          <ProtectedRoute roles={['admin']}>
            <Dashboard />{' '}
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/add-news',
        element: (
          <ProtectedRoute roles={['admin']}>
            <AddNews />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/news-lists',
        element: (
          <ProtectedRoute roles={['admin']}>
            <NewsLists />
          </ProtectedRoute>
        ),
      },
      {
        path: '/leave-info/cause=:leave_cause',
        element: (
          <ProtectedRoute roles={['admin']}>
            <LeaveFilter />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/leave-status',
        element: (
          <ProtectedRoute roles={['admin']}>
            <UpdateStatusForm />
          </ProtectedRoute>
        ),
      },

      {
        path: '/user/news',
        element: (
          <ProtectedRoute roles={['user', 'admin']}>
            <NewsList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/user/dashboard',
        element: (
          <ProtectedRoute roles={['user', 'admin']}>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute roles={['user', 'admin']}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login2 /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
