// Function to debug FormData
export const logFormData = (formData: FormData) => {
  console.log('FormData contents:');
  const entries = Array.from(formData.entries());
  entries.forEach(([key, value]) => {
    if (value instanceof File) {
      console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });
  console.log('Total entries:', entries.length);
};