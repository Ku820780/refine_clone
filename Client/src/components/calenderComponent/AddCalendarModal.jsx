import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { EVENT_API_END_POINT } from '../../utils/EndPoints';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema with Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Event title is required"),
  startDate: Yup.date().required("Event start date is required").nullable(),
  endDate: Yup.date()
    .required("Event end date is required")
    .min(Yup.ref('startDate'), 'End date must be after start date')
    .nullable(),
  description: Yup.string().required("Event description is required"),
});

const AddCalendarModal = ({ onEventAdded }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        `${EVENT_API_END_POINT}/register`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data);
        setShowModal(false);
        toast.success(res.data.message || 'Event added successfully!');
        if (onEventAdded) onEventAdded(); // Notify parent component
      } else {
        toast.error(res.data.message || 'Something went wrong');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message || 'Server Error');
      } else if (error.request) {
        toast.error('No response from the server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        className="text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
        style={{ backgroundColor: 'blue' }}
      >
        Add Events
      </button>

      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-2xl font-semibold">Add New Event</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>

              <div className="relative p-6 flex-auto">
                <Formik
                  initialValues={{ title: '', startDate: '', endDate: '', description: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                          Event Title
                        </label>
                        <Field
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Enter event title"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                          Start Date
                        </label>
                        <Field
                          type="date"
                          id="startDate"
                          name="startDate"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="startDate" component="div" className="text-red-600 text-sm" />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                          End Date
                        </label>
                        <Field
                          type="date"
                          id="endDate"
                          name="endDate"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="endDate" component="div" className="text-red-600 text-sm" />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                          Event Description
                        </label>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          placeholder="Enter event description"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
                      </div>

                      <div className="flex items-center justify-end">
                        <button
                          className="bg-red-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-blue-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Save Event
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCalendarModal;
