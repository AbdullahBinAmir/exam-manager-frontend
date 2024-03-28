import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExamById } from '../services/api';

const ExamDetails = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      const fetchedExam = await getExamById(id);
      setExam(fetchedExam);
    };
    fetchExam();
  }, [id]);

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{exam.title}</h1>
      <p className="text-gray-600 mb-2">{exam.examDate}</p>
      <div className="border p-4">
        <h2 className="text-lg font-semibold mb-2">Questions</h2>
        {exam.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">Question {index + 1}: {question.question}</p>
            <ul className="list-disc list-inside">
              {question.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p className="font-semibold">Correct Option: {question.correctOption}</p>
            <p className="text-gray-600">Domain: {question.domain}</p>
            <p className="text-gray-600">Subdomain: {question.subdomain}</p>
            <p className="text-gray-600">Topic: {question.topic}</p>
            <p className="text-gray-600">Subtopic: {question.subtopic}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block">Back to Exam List</Link>
    </div>
  );
};

export default ExamDetails;