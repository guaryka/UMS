import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { DeleteGroup} from './App';
import reportWebVitals from './reportWebVitals';
import CreateGroupModal from './components/CreateGroup';
import CreateUserModal from './components/CreateUser';
import DeleteUserModal from './components/DeleteUser';
import DetailsGroupModal from './components/DetailsGroup';
import EditGroupModal from './components/EditGroup';
import UpdateUserModal from './components/UpdateUser';
import DeleteGroupUserModal from './components/DeleteGroupUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <DeleteGroup />
    <CreateGroupModal /> 
    <CreateUserModal />
    <DeleteUserModal />
    <DetailsGroupModal />
    <EditGroupModal />
    <UpdateUserModal />
    <DeleteGroupUserModal />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();