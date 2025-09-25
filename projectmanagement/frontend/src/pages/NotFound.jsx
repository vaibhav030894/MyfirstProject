import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{textAlign:'center', padding:'50px'}}>
      <h2>404 — Page Not Found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}
