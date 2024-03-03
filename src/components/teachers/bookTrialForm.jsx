import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";
import handleFormChange from "../../utils/handleFormChange";
import { FullScreenLoader } from "../loader/Loader";
import emailjs from "@emailjs/browser";
import useAuth from "../../hooks/useAuth";

const BookTrialForm = ({ teacher }) => {
  const groupFees = teacher.groupFee;
  const individualFees = teacher.individualFee;
  const [user] = useAuth();

  const initData = {
    email: "",
    session: "",
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initData);
  const [sendingMail, setSendingMail] = useState(false);

  const form = useRef(null);

  function handleSubmit(e) {
    setSendingMail(true);
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_BOOK_TRAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setFormData(initData);
        alert(
          "Successfully send request to book trial! 🥳\nWe will contact you soon"
        );
      })
      .catch(() => {
        alert(
          "❌ There was an error while submitting ❌\n Please try again later"
        );
      })
      .finally(() => {
        setSendingMail(false);
        navigate("/");
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4">
        {!user?.email && <FormControl variant="standard" sx={{ minWidth: "100%" }}>
          <TextField
            id="emailInput"
            label="Email"
            value={formData.email}
            name="email"
            type="email"
            onChange={(e) => handleFormChange(e, setFormData)}
            required
          />
          <FormHelperText id="component-helper-text">
            We will NEVER share your personal data with anyone
          </FormHelperText>
        </FormControl>}

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="session"
          value={formData.session}
          onChange={(e) => handleFormChange(e, setFormData)}
        >
          <FormControlLabel
            value={`Group ₹${groupFees}`}
            control={<Radio required={true} />}
            label={`Group Session`}
          />
          <FormControlLabel
            value={`Individual ₹${individualFees}`}
            control={<Radio required={true} />}
            label={`Individual Session`}
          />
        </RadioGroup>
        <Button
          variant="contained"
          disabled={sendingMail}
          type="submit"
          sx={{ minWidth: "100%" }}
        >
          Submit
        </Button>
      </form>

      {/* Form to send data to email js */}
      <form ref={form} className="hidden">
        <input
          type="text"
          id="email"
          name="email"
          value={user?.email ? user.email : formData.email}
          readOnly
        />
        <input
          type="text"
          id="teacherName"
          name="teacherName"
          value={teacher.name}
          readOnly
        />
        <input
          type="text"
          id="teacherImageLink"
          name="teacherImgLink"
          value={teacher.imageLink}
          readOnly
        />
        <input
          type="text"
          id="courseName"
          name="courseName"
          value={teacher.courseName}
          readOnly
        />
        <input
          type="text"
          id="teacherProfileLink"
          name="teacherProfileLink"
          value={`https://growtechie.com/teachers/${teacher.uid}`}
          readOnly
        />
        <input
          type="text"
          id="session"
          name="session"
          value={formData.session}
          readOnly
        />
      </form>
      {sendingMail && <FullScreenLoader />}
    </div>
  );
};

export default BookTrialForm;
