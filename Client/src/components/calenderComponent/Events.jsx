import { IconButton, Modal, Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Swal from "sweetalert2";
import { EVENT_API_END_POINT } from "../../utils/EndPoints";
import { fetchAllEvent } from "../../Redux/companySlice";

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Events = () => {
  const dispatch = useDispatch();
  const { allEvent } = useSelector((store) => store.companies);
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold selected event details
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  // Function to open modal and prefill with selected event data
  const handleEdit = (event) => {
    setSelectedEvent(event); // Set the selected event data
    setOpenModal(true); // Open the modal
  };

  // Handle delete event
  const deleteEvent = async (id) => {
    if (!id) {
      console.error("Event ID is not provided");
      return;
    }
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const res = await axios.delete(`${EVENT_API_END_POINT}/delete/${id}`);
        if (res.data.success) {
          Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
          dispatch(fetchAllEvent()); // Fetch updated events list
        } else {
          Swal.fire('Error!', 'There was an issue deleting the event.', 'error');
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'There was an issue deleting the event.', 'error');
    }
  };

  // Handle event update form submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.put(`${EVENT_API_END_POINT}/update/${selectedEvent.id}`, {
        title: selectedEvent.title,
        startDate: selectedEvent.startDate,
        endDate: selectedEvent.endDate,
        description: selectedEvent.description
      });

      if (res.data.success) {
        Swal.fire('Updated!', 'The event has been updated successfully.', 'success');
        dispatch(fetchAllEvent()); // Refresh the event list
        setOpenModal(false); // Close the modal
      } else {
        Swal.fire('Error!', 'Failed to update the event.', 'error');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      Swal.fire('Error!', 'There was an error updating the event.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 bg-white shadow-md rounded-lg" style={{ width: "500px" }}>
      <div className="flex items-center p-4 border-b bg-[#F7F8F9]">
        <i className="fas fa-calendar-alt text-gray-600 mr-2"></i>
        <h2 className="text-gray-800 font-semibold">Upcoming events</h2>
      </div>
      <div>
        {allEvent?.map((event) => {
          return (
            <div key={event._id} className="flex items-start p-4 border-b last:border-b-0">
              <div className="flex gap-2">
                <div className="text-gray-600 text-sm">
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>Start:</span> {event?.startDate.split("T")[0]}
                </div>
                <div className="text-white" style={{ backgroundColor: "rgb(59 130 246)", width: "80px", borderRadius: "5px", height: "30px" }}>
                  <span className="mx-2 my-2">{event?.title}</span>
                </div>
                <div className="text-gray-600 text-sm">
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>End:</span> {event?.endDate.split("T")[0]}
                </div>
                <IconButton aria-label="edit" onClick={() => handleEdit(event)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteEvent(event?.id)}>
                  <DeleteIcon style={{ color: 'red' }} />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for updating event details */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <h2>Edit Event</h2>
          <form onSubmit={handleUpdateSubmit}>
            <TextField
              label="Title"
              fullWidth
              value={selectedEvent?.title || ''}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={selectedEvent?.startDate.split("T")[0] || ''}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, startDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={selectedEvent?.endDate.split("T")[0] || ''}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, endDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={selectedEvent?.description || ''}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Events;
