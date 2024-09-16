import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Header from './Header';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch'; // MUI Switch for toggling status
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { COMPANY_API_END_POINT } from '../../utils/EndPoints';
import { removeContact, updateContactStatus, updateCompanyDetails, setAllContact } from '../../Redux/companySlice'; // Import action for updating details
import CompanyFormModal from '../UpdateCompany/CompanyFormModal'; // Import the modal
import useGetAllContact from '../../Hooks/useGetAllContact'; // Ensure you're using the custom hook

const CompanyTable = () => {
  const dispatch = useDispatch();
  const { allContact } = useSelector((store) => store.companies);
  const [openModal, setOpenModal] = React.useState(false); // State to control modal
  const [selectedCompany, setSelectedCompany] = React.useState(null); // State for selected company details
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Track submission state

  // Fetch the latest contact data when the component mounts
  useGetAllContact();

  // Handle delete functionality
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`);
          dispatch(removeContact(id)); // Remove contact from Redux store
          Swal.fire('Deleted!', 'The company has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting company:', error);
          Swal.fire('Error!', 'There was an error deleting the company.', 'error');
        }
      }
    });
  };

  // Handle opening the modal with company details
  const handleEdit = (row) => {
    setSelectedCompany(row); // Set the selected company details
    setOpenModal(true); // Open the modal
  };

  // Handle status change (toggle switch)
  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'; // Toggle status
    try {
      const response = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`, { status: newStatus });
      if (response.data.success) {
        dispatch(updateContactStatus({ id, status: newStatus })); // Update status in Redux store
        Swal.fire('Updated!', `Company status has been changed to ${newStatus}.`, 'success');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire('Error!', 'There was an error updating the company status.', 'error');
    }
  };

  // Handle company update after editing
  const handleCompanyUpdate = async (id, updatedData) => {
    setIsSubmitting(true); // Set submitting state
    try {
      const response = await axios.put(`${COMPANY_API_END_POINT}/contact/update/${id}`, updatedData);
      if (response.data.success) {
        dispatch(updateCompanyDetails({ id, updatedData })); // Update company details in Redux store
        setOpenModal(false); // Close the modal after successful update
        Swal.fire('Updated!', 'Company details have been updated successfully.', 'success');
      }
    } catch (error) {
      console.error('Error updating company details:', error);
      Swal.fire('Error!', 'There was an error updating the company details.', 'error');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // Table columns
  const columns = [
    { field: 'Name', headerName: 'Name', width: 250 },
    { field: 'Email', headerName: 'Email', width: 250 },
    { field: 'Company', headerName: 'Company', width: 250 },
    { field: 'Title', headerName: 'Title', width: 250 },
    {
      field: 'Status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Switch
          checked={params.row.Status === 'Active'} // Set switch position based on current status
          onChange={() => handleStatusChange(params.row.id, params.row.Status)} // Handle status toggle
          color="primary"
        />
      ),
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 250,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
        </div>
      ),
    },
  ];

  // Prepare rows data
  const rows = allContact?.map((company, index) => ({
    id: company._id || index + 1, 
    Name: company?.name,
    Email: company?.email || 'Not Provided',
    Company: company?.company,
    Title: company?.title,
    Status: company?.status || 'Active',
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className='mt-28'>
      <Header />
      <div className='mt-20'>
        <Paper sx={{ height: 400, width: '100%', mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        </Paper>
      </div>

      {/* Render the modal and pass the selected company details */}
      {openModal && (
        <CompanyFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          company={selectedCompany} // Pass the selected company data to the modal
          onCompanyUpdate={handleCompanyUpdate} // Pass the function to update company details
          isSubmitting={isSubmitting} // Pass the submitting state to modal
        />
      )}
    </div>
  );
};

export default CompanyTable;
