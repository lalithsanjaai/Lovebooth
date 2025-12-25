import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // Navigation Flow
      currentStep: 'landing', // landing, layout, camera, editor, result
      setStep: (step) => set({ currentStep: step }),

      // User Info
      userNames: '',
      setUserNames: (names) => set({ userNames: names }),

      // Layout Selection
      selectedLayout: 'single', // single, strip, collage, polaroid
      layoutConfig: {
        poses: 1, // Number of photos to take
        timer: 3, // Seconds
      },
      setLayout: (layout, config) => set({ selectedLayout: layout, layoutConfig: config }),

      // Camera & Photos
      capturedImages: [], // Array of base64 strings
      addCapturedImage: (img) => set((state) => ({ capturedImages: [...state.capturedImages, img] })),
      clearImages: () => set({ capturedImages: [] }),
      
      // Customization
      settings: {
        filter: 'normal',
        frameColor: '#ffffff',
        stickers: [], // { id, src, x, y, rotation, scale }
        textOverlays: [], // { id, text, x, y, style }
      },
      updateSettings: (newSettings) => set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      
      resetSession: () => set({
        currentStep: 'landing',
        capturedImages: [],
        settings: {
          filter: 'normal',
          frameColor: '#ffffff',
          stickers: [],
          textOverlays: [],
        }
      }),
    }),
    {
      name: 'lovebooth-storage-v2', // FORCE RESET: Changed version to clear old corrupted state
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useStore;
