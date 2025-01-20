import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { handleInitialData } from "./actions/shared"; 
import Nav from "./components/nav/Nav";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Leaderboard from "./components/leaderboard/LeaderBoard";
import PollDetails from "./components/poll_details/PollDetails";
import NewQuestion from "./components/new_question/NewQuestion";
import NotFound from "./components/not_found/NotFound";
import ProtectedRoute from "./components/protected_route/ProtectedRoute";

export default function App() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div className="container">
      <Nav />
      <Routes>
        {/* Login route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute authedUser={authedUser}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute authedUser={authedUser}>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute authedUser={authedUser}>
              <NewQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <ProtectedRoute authedUser={authedUser}>
              <PollDetails />
            </ProtectedRoute>
          }
        />

        {/* Catch-all routes */}
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
