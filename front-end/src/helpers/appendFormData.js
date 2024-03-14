export function appendFormData(data) {
  const formData = new FormData();
  for (const prop in data) {
    formData.append(prop, data[prop]);
  }
  return formData;
}
