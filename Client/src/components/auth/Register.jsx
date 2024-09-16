import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '../../utils/EndPoints';
import { Link, useNavigate } from 'react-router-dom';

// Validation schema with Yup
const validationSchema = Yup.object({
  fullname: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  profile: Yup.mixed().required("Profile photo is required"),
});

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('fullname', values.fullname);
      formData.append('email', values.email);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('password', values.password);
      formData.append('profile', values.profile);

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res.data);
        navigate('/login');
        toast.success(res.data.message);
        // alert("Register Successfully...")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-36 p-6 bg-white rounded-lg shadow-lg" style={{ width: "500px", marginLeft: "500px" }}>
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <Formik
        initialValues={{ fullname: '', email: '', phoneNumber: '', password: '', profile: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Field
                type="text"
                id="fullname"
                name="fullname"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
              <ErrorMessage name="fullname" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone No</label>
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Phone No"
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="************"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="profile" className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
              <input
                type="file"
                id="profile"
                name="profile"
                accept="image/*"
                onChange={(e) => setFieldValue("profile", e.target.files[0])}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="profile" component="div" className="text-red-600 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">Login</Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
