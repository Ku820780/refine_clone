const Company = require("../models/company.model.js");
const NewContact = require("../models/addnewcontact.js");

const companyRegister = async (req, res) => {
  try {
    const { companyName, location, title, salary } = req.body;
    const companyLogo = req.file.filename;

    await Company.create({
      companyName,
      title,
      location,
      salary,
      companyLogo,
    });
    return res.status(200).json({
      message: "Company Register SuccessFully..",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// add New Contact
const newContactRegister = async (req, res) => {
  try {
    const { name, email, title, company } = req.body;
    await NewContact.create({
      name,
      email,
      title,
      company,
    });
    return res.status(200).json({
      message: "Company Register SuccessFully..",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const NewContactGet = (req, res) => {
  NewContact.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const companyGet = (req, res) => {
  Company.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const countCompanies = (req, res) => {
  Company.countDocuments()
    .then((count) => {
      res.json({
        success: true,
        message: `Total number of companies: ${count}`,
        count: count,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: 'Error retrieving company count',
        error: err.message,
      });
    });
};

const countContact = (req, res) => {
  NewContact.countDocuments()
    .then((count) => {
      res.json({
        success: true,
        message: `Total number of companies: ${count}`,
        count: count,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: 'Error retrieving company count',
        error: err.message,
      });
    });
};

const paginationWithSearch = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const searchQuery = req.query.search || ''; // Search query, default is an empty string
    
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Define search criteria
    const searchCriteria = {
      $or: [
        { companyName: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search
        { title: { $regex: searchQuery, $options: 'i' } },
        { location: { $regex: searchQuery, $options: 'i' } }
      ]
    };

    // Fetch the paginated data with search criteria
    const companies = await Company.find(searchCriteria)
      .skip(skip)
      .limit(limit);
    
    // Get the total number of documents that match the search criteria
    const totalCompanies = await Company.countDocuments(searchCriteria);

    // Send the response with pagination and search info
    res.json({
      totalCompanies,
      totalPages: Math.ceil(totalCompanies / limit),
      currentPage: page,
      companies
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

///status update

const updateContactStatus = (req, res) => {
  const { id } = req.params; // Get the contact ID from the URL
  const { status } = req.body; // Get the new status from the request body

  // Find contact by ID and update the status
  NewContact.findByIdAndUpdate(id, { status: status }, { new: true })
    .then((updatedContact) => {
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json({ success: true, message: 'Status updated successfully', updatedContact });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to update status', error: err });
    });
};


const contactUpdate = async (req, res) => {
  try {
    const { name, email, title, company } = req.body;
    
    const updateData = {
      name,
      email,
      title,
      company,
    };

    const newContact = await NewContact.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!newContact) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      newContact,
      message: "Company data updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while updating the company data.",
      success: false,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await NewContact.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while deleting the company.",
      success: false,
    });
  }
};

const deleteAllCompanies = async (req, res) => {
  try {
    const result = await NewContact.deleteMany({});

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "No companies found to delete.",
        success: false,
      });
    }

    return res.status(200).json({
      message: `${result.deletedCount} companies deleted successfully.`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while deleting companies.",
      success: false,
    });
  }
};

module.exports = {
  companyRegister,
  companyGet,
  contactUpdate,
  deleteCompany,
  deleteAllCompanies,
  newContactRegister,
  NewContactGet,
  paginationWithSearch,
  countCompanies,
  countContact,
  updateContactStatus
};
