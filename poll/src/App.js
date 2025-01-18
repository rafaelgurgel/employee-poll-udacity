import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { handleInitialData } from './actions/shared'
import Nav from './components/Nav'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Leaderboard from './components/LeaderBoard'
import PollDetails from './components/PollDetails'
import NewQuestion from './components/NewQuestion'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const dispatch = useDispatch()
  const authedUser = useSelector((state) => state.authedUser)

  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
