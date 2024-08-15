import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PortfolioList.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function PortfolioList() {
  const [works, setWorks] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteWorkId, setDeleteWorkId] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/works');
        setWorks(response.data);
      } catch (error) {
        console.error('Error getting papers:', error);
      }
    };

    fetchWorks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/works/${id}`);
      setWorks(works.filter(work => work.id !== id));
      if (showDeleteModal) handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleShowDeleteModal = (id) => {
    setDeleteWorkId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteWorkId(null);
  };

  const handleConfirmDelete = () => {
    handleDelete(deleteWorkId);
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleShowModal = (work) => {
    setModalData(work);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {works.map((work) => (
          <div key={work.id} className="col-md-4 mb-5">
            <div className="card-Portfolio-card">
              <img src={`http://localhost:3000${work.image}`} className="card-img-top" alt={work.title} />
              <div className="card-body">
                <h5 className="card-title">{work.title}</h5>
                <p className="card-text"><button className="btn btn-link" onClick={() => handleShowModal(work)}>See description</button><br></br>
                    {work.status === 'display' ? (
                        <i className="bi bi-eye"></i> 
                    ) : (
                        <i className="bi bi-eye-slash"></i>
                    )}
                </p>
                <div className="d-flex flex-column justify-content-between">
                  <div>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(work.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleShowDeleteModal(work.id)}>Delete</button>
                  </div>
                  <a href={work.link} className="btn btn-primary mt-3">Details</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div><br></br>

      {modalData && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalData.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalData.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Închide
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this work?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PortfolioList;
