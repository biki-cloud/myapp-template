import { useCallback, useEffect, useState } from "react";
import { getNotificationService } from "@/lib/di/client-side-container";

interface UseNotificationSetupResult {
  isSupported: boolean;
  isLoading: boolean;
  hasError: boolean;
  isGranted: boolean;
  requestPermission: () => Promise<void>;
}

export function useNotificationSetup(): UseNotificationSetupResult {
  const notificationService = getNotificationService();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    async function checkSupport() {
      try {
        const supported = await notificationService.checkSupport();
        setIsSupported(supported);
      } catch (error) {
        console.error("Failed to check notification support:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    checkSupport();
  }, [notificationService]);

  const requestPermission = useCallback(async () => {
    try {
      setIsLoading(true);
      const granted = await notificationService.requestPermission();
      setIsGranted(granted);
    } catch (error) {
      console.error("Failed to request notification permission:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [notificationService]);

  return {
    isSupported,
    isLoading,
    hasError,
    isGranted,
    requestPermission,
  };
}
