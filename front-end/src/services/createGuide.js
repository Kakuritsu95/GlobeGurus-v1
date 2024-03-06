import axios from "axios";
export default async function createGuide(data) {
  const { territory, title, description, guideImage } = data;
  const formData = new FormData();

  formData.append("guideImage", guideImage[0]);
  formData.append("territory", territory);
  formData.append("title", title);
  formData.append("description", description);

  const response = await axios.post("http://localhost:7000/guides", formData);
  console.log(response);
}
