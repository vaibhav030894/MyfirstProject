import React, { useEffect, useState } from 'react';
import API from '../api';
// import { useAuth } from './src/context/AuthContext';
import { useAuth } from "../context/AuthContext";


export default function ProjectsPage() {
  const [projects,setProjects] = useState([]);
  const [title,setTitle] = useState('');
  const { user } = useAuth();

  useEffect(()=>{
    API.get('/projects').then(res=>setProjects(res.data));
  },[]);

  const handleCreate = async e=>{
    e.preventDefault();
    const res = await API.post('/projects', { title });
    setProjects([...projects,res.data]);
    setTitle('');
  };

  return (
    <div>
      <h2>{user?.name}'s Projects</h2>
      <form onSubmit={handleCreate}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New project" required/>
        <button type="submit">Add Project</button>
      </form>
      <ul>
        {projects.map(p=><li key={p._id}>{p.title}</li>)}
      </ul>
    </div>
  );
}
