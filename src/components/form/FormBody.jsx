import { forwardRef } from "react";
import { f1, f2, f3, f4 } from "/public/assets/form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./form.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#e7f5ec",
  // border: "4px solid var(--moonstone-blue)",
  boxShadow: "5px 15px 25px rgba(255, 255, 255, 0.2)",
};

const FormBody = ({ children, title, intro, onSubmit, open=true, handleClose }, ref) => {

  return (
    <section className="p-5 py-28 z-10 relative">
      <div className="max-w-[90vw] mx-auto w-[700px]">
        <p className="max-w-[64ch] text-[var(--secondary-text)]">{intro}</p>
        <button onClick={handleClose}>open</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            className={`h-[500px] max-h-[90vh] overflow-y-scroll white-box-shadow no-scrollbar rounded-lg`}
          >
            <h1 className="capitalize text-[40px] text-gradient font-bold px-3 pt-8 text-center">
              {title}
            </h1>
            <form
              ref={ref}
              onSubmit={onSubmit}
              className="flex flex-col gap-4 relative p-8"
            >
              {children}
              <button
                type="submit"
                className="text-white text-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg px-5 py-2.5 text-center mb-2"
              >
                SUBMIT
              </button>
            </form>
          </Box>
        </Modal>
      </div>
      <FormDesign />
    </section>
  );
};

export default forwardRef(FormBody);

const FormDesign = () => (
  <div>
    <img
      src={f1}
      alt="design image"
      className="hidden lg:block fixed w-40 top-24 left-10"
    />
    <img
      src={f2}
      alt="design image"
      className="hidden lg:block fixed w-40 top-24 right-10"
    />
    <img
      src={f3}
      alt="design image"
      className="hidden lg:block bottom-design fixed w-40 bottom-0 left-10"
    />
    <img
      src={f4}
      alt="design image"
      className="hidden lg:block bottom-design fixed w-40 bottom-10 right-10"
    />
  </div>
);
