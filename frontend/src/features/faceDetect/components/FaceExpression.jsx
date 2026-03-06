import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    let mounted = true;
    let animationFrameId;

    const loop = () => {
      if (!mounted) return;
      detect({ landmarkerRef, videoRef, setExpression });
      animationFrameId = requestAnimationFrame(loop);
    };

    const startCamera = async () => {
      try {
        await init({ landmarkerRef, videoRef, streamRef });
        if (!mounted) {
          // Cleanup if unmounted during init
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
              track.stop();
            });
            streamRef.current = null;
          }
          if (landmarkerRef.current) {
            landmarkerRef.current.close();
            landmarkerRef.current = null;
          }
          return;
        }
        setExpression("Camera Ready");
        loop();
      } catch (err) {
        if (!mounted) return;
        console.error("Error initializing face detection:", err);
        setExpression(`Error: ${err.message || "Camera init failed"}`);
        // Cleanup on failure
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
          });
          streamRef.current = null;
        }
        if (landmarkerRef.current) {
          landmarkerRef.current.close();
          landmarkerRef.current = null;
        }
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
      />
      <h2>{expression}</h2>
    </div>
  );
}

export default FaceExpression