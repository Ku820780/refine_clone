import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { COMPANY_API_END_POINT } from "../../utils/EndPoints";
import axios from "axios";
import { toast } from "sonner";

// Validation schema using Yup
const validationSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  title: Yup.string().required("Title is required"),
  location: Yup.string().required("Location is required"),
  salary: Yup.string().required("Deal amount is required"),
  companyLogo: Yup.mixed().required("Company logo is required").test(
    "fileSize",
    "The file is too large",
    value => !value || (value && value.size <= 2000000) // 2MB limit
  )
});

const CompanyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('companyName', values.companyName);
      formData.append('title', values.title);
      formData.append('location', values.location);
      formData.append('salary', values.salary);
      formData.append('companyLogo', values.companyLogo);

      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        onClose();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      style={{ zIndex: 9999 }} // Ensuring modal is on top
    >
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />

      <div
        className="relative z-50 inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Body */}
        <div className="bg-white p-6">
          <h6 className="text-lg font-medium text-gray-900">Add new company</h6>
          <hr className="mt-4 mb-4" />
          
          <Formik
            initialValues={{
              companyName: '',
              title: '',
              location: '',
              salary: '',
              companyLogo: null
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="space-y-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="text-red-500">*</span> Company name
                    </label>
                    <Field
                      type="text"
                      name="companyName"
                      className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                      placeholder="Enter company name"
                    />
                    <ErrorMessage name="companyName" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="text-red-500">*</span> Title
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                      placeholder="Enter title"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="text-red-500">*</span> Location
                    </label>
                    <Field
                      type="text"
                      name="location"
                      className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                      placeholder="Enter location"
                    />
                    <ErrorMessage name="location" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="text-red-500">*</span> Deal Amount
                    </label>
                    <Field
                      type="text"
                      name="salary"
                      className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                      placeholder="Enter deal amount"
                    />
                    <ErrorMessage name="salary" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  {/* Company Logo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="text-red-500">*</span> Company Logo
                    </label>
                    <input
                      type="file"
                      className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                      id="companyLogo"
                      name="companyLogo"
                      accept="image/*"
                      onChange={(event) => setFieldValue("companyLogo", event.currentTarget.files[0])}
                    />
                    <ErrorMessage name="companyLogo" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 px-4 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Close Button */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
