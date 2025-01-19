// src/components/NotFound.js
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSetAuthedUser } from '../../actions/shared';
import './not_found.css'

export default function NotFound() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Log out the user when they reach the NotFound page
    dispatch(handleSetAuthedUser(null));
  }, [dispatch]);

  return (
    <div className="notfound-container">
      <h2 className="notfound-text">404 - Not Found</h2>
    </div>
  )
}
