import { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const useCamera = () => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const webcam = webcamRef.current;
    if (webcam) {
      // We need to manually capture and flip because the preview is mirrored via CSS
      // but the raw stream is not.
      const video = webcam.video;
      if (!video || video.readyState !== 4) return null;

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      // Mirror if user facing
      if (webcam.props.videoConstraints?.facingMode === 'user' || !webcam.props.videoConstraints?.facingMode) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
      }
      
      // Draw image
      ctx.drawImage(video, 0, 0);
      
      return canvas.toDataURL('image/jpeg', 0.92);
    }
    return null;
  }, [webcamRef]);

  return {
    webcamRef,
    capture,
  };
};

export default useCamera;
