import React, { useEffect, useState } from 'react';
import { createExam, getExamById, updateExam } from '../services/api';
import { useParams } from 'react-router-dom';

const ExamForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    examDate: '',
    questions: [{ question: '', options: ['', '', '', ''], correctOption: '', domain: '', subdomain: '', topic: '', subtopic: '' }],
  });

  const { id } = useParams();

  useEffect(() => {
    if(id){
        const fetchExam = async () => {
            const fetchedExam = await getExamById(id);
            setFormData(fetchedExam);
          };
          fetchExam();
    }
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const questions = [...formData.questions];
    questions[index][name] = value;
    setFormData(prevState => ({
      ...prevState,
      questions,
    }));
  };

  const handleOptionChange = (e, index, optionIndex) => {
    const value = e.target.value;
    const questions = [...formData.questions];
    questions[index].options[optionIndex] = value;
    setFormData(prevState => ({
      ...prevState,
      questions,
    }));
  };

  const addQuestion = () => {
    setFormData(prevState => ({
      ...prevState,
      questions: [...prevState.questions, { question: '', options: ['', '', '', ''], correctOption: '', domain: '', subdomain: '', topic: '', subtopic: '' }]
    }));
  };

//   const removeQuestion = (index) => {
//     const questions = [...formData.questions];
//     questions.splice(index, 1);
//     setFormData(prevState => ({
//       ...prevState,
//       questions,
//     }));
//   };

  const saveExam = async ()=>{
    const result = await createExam(formData)
    console.log(result)
    if(result?.message){
        alert(result.message)
    }
    else{
        alert(result.error)
    }
  }

  const changeExam = async ()=>{
    const result = await updateExam(formData._id,formData)
    console.log(result)
    if(result?.message){
        alert(result.message)
    }
    else{
        alert(result.error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    if(!id){
        saveExam()
    }
    else{
        changeExam()
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-semibold mb-6 text-center">Exam Form</h1>
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
      </div>
      <div className="mb-4">
        <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">Thumbnail URL</label>
        <input type="text" id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
      </div>
      <div className="mb-4">
        <label htmlFor="examDate" className="block text-gray-700 text-sm font-bold mb-2">Exam Date</label>
        <input type="date" id="examDate" name="examDate" value={formData.examDate} onChange={(e) => setFormData({ ...formData, examDate: e.target.value })} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
      </div>
      <h2 className="text-lg font-semibold mb-4">Questions</h2>
      {formData.questions.map((question, index) => (
        <div key={index} className="border p-4 mb-4">
          <div className="mb-4">
            <label htmlFor={`question-${index}`} className="block text-gray-700 text-sm font-bold mb-2">Question</label>
            <input type="text" id={`question-${index}`} name="question" value={question.question} onChange={(e) => handleChange(e, index)} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Options</label>
            {question.options.map((option, optionIndex) => (
              <input key={optionIndex} type="text" name={`option-${index}-${optionIndex}`} value={option} onChange={(e) => handleOptionChange(e, index, optionIndex)} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor={`correctOption-${index}`} className="block text-gray-700 text-sm font-bold mb-2">Correct Option</label>
            <input type="text" id={`correctOption-${index}`} name="correctOption" value={question.correctOption} onChange={(e) => handleChange(e, index)} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
          </div>
          <div className="mb-4">
            <label htmlFor={`domain-${index}`} className="block text-gray-700 text-sm font-bold mb-2">Domain</label>
            <input type="text" id={`domain-${index}`} name="domain" value={question.domain} onChange={(e) => handleChange(e, index)} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
          </div>
          <div className="mb-4">
            <label htmlFor={`subdomain-${index}`} className="block text-gray-700 text-sm font-bold mb-2">Subdomain</label>
            <input type="text" id={`subdomain-${index}`} name="subdomain" value={question.subdomain} onChange={(e) => handleChange(e, index)} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
          </div>
          <div className="mb-4">
            <label htmlFor={`topic-${index}`} className="block text-gray-700 text-sm font-bold mb-2">Topic</label>
            <input type="text" id={`topic-${index}`} name="topic" value={question.topic} onChange={(e) => handleChange(e, index)} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
          </div>
          <div className="mb-4">
            <label htmlFor={`subtopic-${index}`} className="block text-gray-700 text-sm font-bold mb-2">Subtopic</label>
            <input type="text" id={`subtopic-${index}`} name="subtopic" value={question.subtopic} onChange={(e) => handleChange(e, index)} className="form-input mt-1 block w-full rounded border-gray-300 border-[1px]" />
          </div>
        </div>
      ))}
      <button type="button" onClick={addQuestion} className="bg-blue-500 text-white py-2 px-4 rounded">Add Question</button>
      {id ? 
        <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded ml-2">Update</button>
      :
        <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded ml-2">Submit</button>
      }
      </form>
    </div>
  );
};

export default ExamForm;