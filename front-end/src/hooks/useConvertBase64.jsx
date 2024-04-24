import { useState } from "react";

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
function useConvertBase64() {
  const [base64, setBase64] = useState();

  async function handleFileInputChange(e) {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64(base64);
  }
  return { base64, setBase64, handleFileInputChange };
}

export default useConvertBase64;
