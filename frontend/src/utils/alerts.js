import Swal from "sweetalert2";

const base = {
  confirmButtonColor: "#4f46e5",
  cancelButtonColor: "#ef4444",
};

/* SUCCESS */
export const successAlert = (title, text = "") =>
  Swal.fire({
    ...base,
    icon: "success",
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
  });

/* ERROR */
export const errorAlert = (title, text = "") =>
  Swal.fire({
    ...base,
    icon: "error",
    title,
    text,
  });

/* CONFIRM */
export const confirmAlert = async (title, text = "") => {
  const res = await Swal.fire({
    ...base,
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Yes",
  });
  return res.isConfirmed;
};