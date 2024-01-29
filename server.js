import express from "express";
import "dotenv/config";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();

// middlewares

app.use(express.json());
app.use(cors());

app.listen(9000, console.log("server successfully started"));

app.post("/mail", async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "spellbee931@gmail.com",
        pass: "iyodaocmlnjdrhkj",
      },
    });

    var mailOptions = {
      from: "spellbee931@gmail.com",
      to: "info@vgfenceproducts.com",
      subject: "VgFence",
      replyTo: "info@vgfenceproducts.com",
      html: `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enquiry Details</title>
</head>
<body>
    <h2>Enquiry Details</h2>
    <p><strong>Company Name:</strong>${req.body.companyName}</p>
    <p><strong>Name:</strong>${req.body.name}</p>
    <p><strong>Email:</strong>${req.body.email}</p>
    <p><strong>Phone:</strong>${req.body.phone}</p>
    <p><strong>Website:</strong>${req.body.website}</p>
    <p><strong>Product:</strong>${req.body.product}</p>
    <p><strong>Description:</strong>${req.body.description}</p>
    <p><strong>Unique Selling Point:</strong>${req.body.uniqueSelling}</p>
    <p><strong>Years in Business:</strong>${req.body.years}</p>
    <p><strong>Area Served:</strong>${req.body.areaServed}</p>
    <p><strong>Certifications:</strong>${req.body.certifications}</p>
    <p><strong>Stand Out Feature:</strong>${req.body.standOut}</p>
    <p><strong>Specific Reason:</strong>${req.body.specificReason}</p>
    <p><strong>Partner With:</strong> ${req.body.partnerWith}</p>
    <p><strong>Additional Info:</strong> ${req.body.additionalInfo}</p>
</body>
</html>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({
          message: "We are Facing some problem with this service",
          error,
        });
      } else {
        console.log("email sent");
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
});
