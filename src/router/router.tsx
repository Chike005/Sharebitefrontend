import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import paths, { rootPaths } from './path';
import ProtectedRoute from './protectedroute';

/* ---------------- Lazy loads various components ------------------------- */
const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));

const Home = lazy(() => import('pages/Home'));
const Dashboard = lazy(() => import('pages/admin/dashboard'));
const Donations = lazy(() => import('pages/admin/donations'));
const Donors = lazy(() => import('pages/admin/donors'));
const Recievers = lazy(() => import('pages/admin/recievers'));
const DroffSites = lazy(() => import('pages/admin/droffsites'));

const Profile = lazy(() => import('pages/profile'));

const Reciever = lazy(() => import('pages/reciever/dashboard'));
const Reciept = lazy(() => import('pages/reciever/reciepts'));
const Reservations = lazy(() => import('pages/reciever/reservations'));

const Donor = lazy(() => import('pages/donor/dashboard'));
const History = lazy(() => import('pages/donor/history'));

const SignupPage = lazy(() => import('pages/authentication/signup'));
const LoginPage = lazy(() => import('pages/authentication/login'));

const Spinner = lazy(() => import('components/loading/Spinner'));
const LoadingProgress = lazy(() => import('components/loading/LoadingProgress'));

const NotFoundPage = lazy(() => import('pages/not-found'));
/* -------------------------------------------------------------------------- */

export const routes = [
  {
    element: (
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: paths.default, // Redirect "/" to "/home"
        element: <Navigate to={paths.home} replace />,
      },
      {
        path: paths.home, // ✅ Home page (PUBLIC)
        element: (
          <Suspense fallback={<LoadingProgress />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: rootPaths.authRoot, // ✅ Authentication routes
        element: <AuthLayout />,
        children: [
          {
            path: paths.login,
            element: <LoginPage />,
          },
          {
            path: paths.signup,
            element: <SignupPage />,
          },
        ],
      },
      {
        path: rootPaths.pageRoots, // ✅ Protected routes for authenticated users
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: paths.dashboard,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: paths.donations,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <Donations />
              </Suspense>
            ),
          },
          {
            path: paths.donors,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <Donors />
              </Suspense>
            ),
          },
          {
            path: paths.receivers,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <Recievers />
              </Suspense>
            ),
          },
          {
            path: paths.droffsites,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <DroffSites />
              </Suspense>
            ),
          },
          {
            path: paths.donordashboard,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <Donor />
              </Suspense>
            ),
          },
          {
            path: paths.history,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <History />
              </Suspense>
            ),
          },
          {
            path: paths.recieverdashboard,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <Reciever />
              </Suspense>
            ),
          },
          {
            path: paths.reservations,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <Reservations />
              </Suspense>
            ),
          },
          {
            path: paths.receipt,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <Reciept />
              </Suspense>
            ),
          },
          {
            path: paths.profile,
            element: (
              <Suspense fallback={<LoadingProgress />}>
                <Profile />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: rootPaths.errorRoot,
        children: [
          {
            path: paths.notfound,
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: '*', // Redirect unknown paths to NotFoundPage
        element: <Navigate to={paths.notfound} replace />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/',
});

export default router;
