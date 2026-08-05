"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socketUrl =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(
    /\/api\/?$/,
    "",
  );

export default function PresenceConnection() {
  const token = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.user?.role || state.user.role);

  useEffect(() => {
    if (!token || !["student", "teacher"].includes(role)) return undefined;

    const socket = io(socketUrl, {
      auth: { token },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    return () => socket.disconnect();
  }, [token, role]);

  return null;
}
