import { useState } from 'react';
import { fileUpload } from '../helpers/fileUpload';
import Swal from 'sweetalert2';
export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    if (target.type === 'file') {
      console.log(target);
      handlePictureUpload(target);
    } else {
      setValues({
        ...values,
        [target.name]: target.value,
      });
    }
  };
  const handlePictureUpload = async (target) => {
    const file = target.files[0];
    if (file) {
      Swal.fire({
        title: 'Uploading',
        text: 'Please wait...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const fileUrl = await fileUpload(file);

      setValues({
        ...values,
        [target.name]: fileUrl,
      });
      Swal.close();
    }
  };

  return [values, handleInputChange, reset];
};
