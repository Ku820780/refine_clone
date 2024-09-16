import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon
import Swal from 'sweetalert2'; // Import SweetAlert2
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/EndPoints';

const CompanyFormModal = ({ open, onClose, company }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    title: ''
  });

  // Populate the form with selected company details when modal opens
  useEffect(() => {
    if (company) {
      setFormData({
        name: company?.Name || '',
        email: company?.Email || '',
        company: company?.Company || '',
        title: company?.Title || ''
      });
    }
  }, [company]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the company ID is available
    const id = company?.id;

    if (!id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Company ID is missing'
      });
      return;
    }

    try {
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      if (res.data.success) {
        onClose();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.message || 'Company details updated successfully'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: res.data.message || 'Failed to update company details'
        });
      }
    } catch (error) {
      console.error('Error updating company:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'An error occurred while updating the company'
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-company-modal"
      aria-describedby="edit-company-form"
    >
      <Box sx={{ ...style, width: 400 }}>
        {/* Close button at the top-right corner */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <h2>Edit Company Details</h2>

        <form>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Save and Close buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default CompanyFormModal;
