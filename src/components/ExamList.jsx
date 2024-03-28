import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllExams, deleteExam } from '../services/api';

const ExamList = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const fetchedExams = await getAllExams();
      console.log(fetchedExams)
        setExams(fetchedExams);
    };
    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    await deleteExam(id);
    setExams(exams.filter(exam => exam._id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Exam List</h1>
      <Link to="/exams/new" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">Create New Exam</Link>
      <div className="grid grid-cols-3 gap-4">
        {exams.map(exam => (
          <div key={exam._id} className="border p-4">
            <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>
            <p className="text-gray-600 mb-2">{exam.examDate}</p>
            <Link to={`/exams/${exam._id}`} className="bg-blue-500 text-white py-1 px-2 rounded mr-2">View</Link>
            <Link to={`/exams/${exam._id}/edit`} className="bg-green-500 text-white py-1 px-2 rounded mr-2">Edit</Link>
            <button onClick={() => handleDelete(exam._id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamList;