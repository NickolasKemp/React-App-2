import React from 'react';
import './App.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import BoardsPage from './components/pages/BoardsPage';
import SingleBoardPage from './components/pages/SingleBoardPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<BoardsPage />}/>
      <Route path='board/:id' element={<SingleBoardPage/>} />
    </Route>
  ))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
