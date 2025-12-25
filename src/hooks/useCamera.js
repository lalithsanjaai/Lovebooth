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
      
      // Calculate Square Crop
      const size = Math.min(video.videoWidth, video.videoHeight);
      const startX = (video.videoWidth - size) / 2;
      const startY = (video.videoHeight - size) / 2;

      canvas.width = size;
      canvas.height = size;
      
      const ctx = canvas.getContext('2d');
      // Mirror if user facing
      if (webcam.props.videoConstraints?.facingMode === 'user' || !webcam.props.videoConstraints?.facingMode) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
      }
      
      // Draw Square Crop
      ctx.drawImage(video, startX, startY, size, size, 0, 0, size, size);
      
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
