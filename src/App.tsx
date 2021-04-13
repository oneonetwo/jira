import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ProjectListScreen } from 'screens/project-list';
import { TsReactTest } from 'try-use-array';
import { UnauthenticatedApp } from 'screens/login';
import { AuthenticatedApp } from './authenticated-app';
import { useAuth } from 'context/auth-context';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
      
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
