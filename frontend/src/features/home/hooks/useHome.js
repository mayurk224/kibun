import { useState, useCallback } from "react";
import { uploadTrack, getAllMusic } from "../services/home.api";

export const useHome = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [musicList, setMusicList] = useState([]);
  const [isFetchingMusic, setIsFetchingMusic] = useState(false);

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

  const handleGetAllMusic = useCallback(async () => {
    try {
      setIsFetchingMusic(true);
      const response = await getAllMusic();
      if (response.success) {
        setMusicList(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch music:", error);
    } finally {
      setIsFetchingMusic(false);
    }
  }, []);

  return {
    isUploading,
    message,
    setMessage,
    handleUploadTrack,
    musicList,
    isFetchingMusic,
    handleGetAllMusic,
  };
};
