import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddEditWork.css';

const EditWork = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/works/${id}`);
        const work = response.data;
        setTitle(work.title);
        setDescription(work.description);
        setLink(work.link);
        setStatus(work.status);
        setImagePreview(work.image ? `http://localhost:3000${work.image}` : '');
      } catch (error) {
        console.error('Eroare la obținerea lucrării:', error);
      }
    };

    fetchWork();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('status', status);

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:3000/works/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Data updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating data:', error);
      setErrorMessage('Error updating data. Please try again.');
    }
  };

  return (
    <div className="container-custom mt-5">
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <h2 className="mb-4">Edit the work</h2>
      <form className="Add-the-work-form" onSubmit={handleSubmit}>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="image" className="form-label">Image</label>
            {imagePreview && <img src={imagePreview} alt="Preview" className="img-preview"/>}
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="link" className="form-label">Link</label>
            <input
              type="url"
              id="link"
              className="form-control"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="display">Display</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditWork;