import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/EndPoints";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/authSlice";

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res.data);
        dispatch(setUser(res.data.user));
        navigate("/dashboard");
        toast.success(res.data.message);
        // alert("Login Successfully...")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="mt-36 p-6 bg-white rounded-lg shadow-lg"
      style={{ width: "500px", marginLeft: "500px" }}
    >
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && touched.email ? (
                <div className="text-red-600 text-sm">{errors.email}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="************"
              />
              {errors.password && touched.password ? (
                <div className="text-red-600 text-sm">{errors.password}</div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>

            <span className="text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
