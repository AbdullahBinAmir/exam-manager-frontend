import React from 'react';
import ExamList from './components/ExamList';
import ExamForm from './components/ExamForm';
import ExamDetails from './components/ExamDetails';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ExamList/>,
    },
    {
      path: "/exams/new",
      element: <ExamForm/>,
    },
    {
      path: "/exams/:id/edit",
      element: <ExamForm/>,
    },
    {
      path: "/exams/:id",
      element: <ExamDetails/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;