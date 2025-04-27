import { useCallback, useEffect, useState } from "react";

interface UseNotificationSetupResult {
  isSupported: boolean;
  isLoading: boolean;
  hasError: boolean;
  isGranted: boolean;
  requestPermission: () => Promise<void>;
}

export function useNotificationSetup(): UseNotificationSetupResult {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const isSupported =
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "Notification" in window;

  useEffect(() => {
    if (!isSupported) return;
    setIsGranted(Notification.permission === "granted");
  }, [isSupported]);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return;
    setIsLoading(true);
    setHasError(false);
    try {
      // Service Worker登録
      await navigator.serviceWorker.register("/service-worker.js");
      // 通知許可リクエスト
      const permission = await Notification.requestPermission();
      setIsGranted(permission === "granted");
    } catch (e) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  return { isSupported, isLoading, hasError, isGranted, requestPermission };
}
