import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton"; 
import CloseIcon from "@mui/icons-material/Close";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import { PiSquaresFourDuotone } from "react-icons/pi";
import { FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/EndPoints";
import { setAllContact } from "../../Redux/companySlice"; // Redux action for setting contact
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Contact Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  title: Yup.string().required("Title is required"),
  company: Yup.string().required("Company is required"),
});

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={{ ...style, zIndex: 1300 }} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

// Modal box style
const modalStyle = {
  position: "absolute",
  top: "600%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 1300, // Ensure the modal has a high z-index
};

const Header = React.memo(() => {
  const dispatch = useDispatch();
  const { allCompany } = useSelector((store) => store.companies);
  const [open, setOpen] = useState(false);
  const [totalcompanies, setTotalcompanies] = useState([]);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // Fetch all companies on initial load
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`);
        if (res.data) {
          setTotalcompanies(res.data);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchAllCompanies();
  }, []);

  // Form submit handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/addnewcontact`, values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        handleClose();
        resetForm();

        // Fetch updated list of contacts
        const updatedContacts = await axios.get(`${COMPANY_API_END_POINT}/get/newcontact`);
        dispatch(setAllContact(updatedContacts.data)); // Update Redux store
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div style={{ marginLeft: "", position: "relative" }}>
      <div style={{display:"flex"}}>
        <Button onClick={handleOpen} style={{ backgroundColor: "blue", color: "white" }}>
          Add new contact
        </Button>

        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#f0f0f0", marginLeft: "1200px", borderRadius: "4px" }}>
          <div style={{ display: "flex", borderRadius: "4px", overflow: "hidden" }}>
            <Link to="/contacts">
              <IconButton style={{ borderRight: "1px solid #ccc" }}>
                <PiSquaresFourDuotone size={20} />
              </IconButton>
            </Link>
            <Link to="/contactcards">
              <IconButton>
                <FaBars size={20} />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
      
      <div>
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography id="spring-modal-title" variant="h6" component="h2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Create contact
              <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            </Typography>
            <hr style={{ marginTop: "16px" }} />
            <Formik
              initialValues={{
                name: '',
                email: '',
                title: '',
                company: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                    <p>
                      <span style={{ color: "red", marginRight: "10px" }}>*</span>
                      Contact Name
                    </p>
                    <Box sx={{ width: "100%", marginTop: "10px" }}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Name"
                        name="name"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Box>
                    <p className="mt-4">
                      <span style={{ color: "red", marginRight: "10px" }}>*</span>
                      Email
                    </p>
                    <Box sx={{ width: "100%", marginTop: "10px", marginBottom: "20px" }}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Email"
                        name="email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Box>
                    <p className="mt-4">
                      <span style={{ color: "red", marginRight: "10px" }}>*</span>
                      Title
                    </p>
                    <Box sx={{ width: "100%", marginTop: "10px", marginBottom: "20px" }}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Title"
                        name="title"
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                      />
                    </Box>
                    <p className="mt-4 mb-2">
                      <span style={{ color: "red", marginRight: "10px" }}>*</span>
                      Company
                    </p>
                    <Box sx={{ width: "100%", marginTop: "10px" }}>
                      <Field
                        as={TextField}
                        select
                        label="Company"
                        name="company"
                        error={touched.company && Boolean(errors.company)}
                        helperText={touched.company && errors.company}
                      >
                        {totalcompanies.map((item) => (
                          <MenuItem key={item._id} value={item.companyName}>
                            {item.companyName}
                          </MenuItem>
                        ))}
                      </Field>
                    </Box>
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        marginTop: "10px",
                        width: "100%",
                      }}
                    >
                      Create contact
                    </Button>
                  </Typography>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </div>
    </div>
  );
});

export default Header;
