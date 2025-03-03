const Certificate = require("../models/certificate");
const cloudinary = require("../config/cloudinary");

// Upload a new certificate
exports.uploadCertificate = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      const timestamp = Date.now(); // Current time in milliseconds
        const originalFilename = req.file.originalname.replace(/\s+/g, "_"); // Remove spaces
        const uniqueFilename = `${timestamp}-${originalFilename}`;

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "certificates",  // Store inside 'certificates' folder
                public_id: uniqueFilename,
                resource_type: "image"
            },
            (error, cloudinaryResult) => {
                if (error) reject(error);
                else resolve(cloudinaryResult);
            }
        );
        stream.end(req.file.buffer);  // Upload from buffer (memory)
    });
    

      // Save certificate details in DB
      const newCertificate = new Certificate({
          user_id: req.body.user_id,
          title: req.body.title,
          issuing_authority: req.body.issuing_authority,
          issue_date: req.body.issue_date,
          expiry_date: req.body.expiry_date,
          certificate_url: result.secure_url, // Cloudinary URL
          is_verified: false
      });

      await newCertificate.save();
      res.status(201).json({ 
        success: true, 
        message: "Certificate uploaded successfully", 
        certificate: newCertificate,
        public_id: result.public_id
      });

  } 
  catch (error) {
      res.status(500).json({ success: false, message: "Error uploading certificate", error: error.message });
  }
};


// Get all certificates for a user
exports.getUserCertificates = async (req, res) => {
    try {
        const { user_id } = req.params;
        const certificates = await Certificate.find({ user_id });

        res.status(200).json({ success: true, certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching certificates", error: error.message });
    }
};

// Delete a certificate
exports.deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const certificate = await Certificate.findById(id);

        if (!certificate) {
            return res.status(404).json({ success: false, message: "Certificate not found" });
        }

        // Extract public_id from Cloudinary URL
        const publicId = certificate.certificate_url.split("/").pop().split(".")[0];

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(`certificates/${publicId}`);

        // Delete from database
        await Certificate.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Certificate deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete certificate", error: error.message });
    }
};
