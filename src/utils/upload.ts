import uploadImage from "./cloudinary";
const uploadFile = async (file: File, folder: string): Promise<string> => {
  try {
    const uploadedFile = await uploadImage(file, folder);
    return uploadedFile.secure_url; // Ensure to return the secure URL
  } catch (error) {
    console.error(`Error uploading ${folder}:`, error);
    throw new Error(`Failed to upload ${folder}`);
  }
};

export const ImageUpload = async (imageUrl: File): Promise<string> => {
  return await uploadFile(imageUrl, "images");
};

export const PdfUpload = async (pdfUrl: File): Promise<string> => {
  return await uploadFile(pdfUrl, "pdf");
};
