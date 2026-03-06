import { useState, useCallback } from "react";
import { uploadTrack } from "../services/home.api";

export const useHome = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleUploadTrack = useCallback(async (formData) => {
    try {
      setIsUploading(true);
      setMessage({ text: "", type: "" });

      const response = await uploadTrack(formData);

      if (response.success) {
        setMessage({ text: "Upload successful!", type: "success" });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        text: error.response?.data?.message || "Failed to upload file",
        type: "error",
      });
      return false;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return {
    isUploading,
    message,
    setMessage,
    handleUploadTrack,
  };
};
