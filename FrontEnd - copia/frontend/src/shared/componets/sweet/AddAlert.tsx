import Swal from 'sweetalert2';

export const addAlert = (title: string, text: string, callback?: () => Promise<void> | void) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "OK"
  }).then(() => {
    if (callback) callback();
  });
};
