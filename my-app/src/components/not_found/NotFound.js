// src/components/NotFound.js
import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'; this makes no sense, log out the user if its not found, the user logs in again and gets redirected to 404
// and its automatically logged out again. The user should see the not found page but continue logged in
import { handleSetAuthedUser } from '../../actions/shared';
import './not_found.css'

export default function NotFound() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Log out the user when they reach the NotFound page
  //   dispatch(handleSetAuthedUser(null));
  // }, [dispatch]);

  return (
    <div className="notfound-container">
      <h2 className="notfound-text">404 - Not Found</h2>
    </div>
  )
}
