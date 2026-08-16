"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BsEmojiSmile } from "react-icons/bs";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPaperPlane,
  FaPhone,
  FaPhoneSlash,
  FaPlus,
  FaSearch,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdAttach } from "react-icons/io";
import {
  getChatContacts,
  getChatIceConfig,
  getChatMessages,
  uploadChatAttachment,
} from "@/features/API";

const ui = {
  font: { h1: "text-base md:text-lg font-semibold tracking-tight" },
  card: "bg-white rounded-xl shadow-sm border border-gray-100",
  hover:
    "transition duration-200 ease-out hover:shadow-md hover:-translate-y-[1px]",
};
const socketUrl =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(
    /\/api\/?$/,
    "",
  );
const idOf = (value) => String(value?._id || value || "");
const timeOf = (date) =>
  date
    ? new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const emojiOptions = [
  "😀",
  "😂",
  "😍",
  "👍",
  "🙏",
  "🔥",
  "🎉",
  "😎",
  "❤️",
  "💯",
];

const downloadAttachment = async (url, name = "Attachment") => {
  if (!url) return;

  try {
    const response = await fetch(url, { credentials: "include" });
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.target = "_blank";
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

export default function RealtimeChat() {
  const searchParams = useSearchParams();
  const requestedUserId = searchParams.get("userId") || "";
  const currentUser = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const myId = idOf(currentUser);
  const [contacts, setContacts] = useState([]),
    [selectedId, setSelectedId] = useState(""),
    [messages, setMessages] = useState([]),
    [draft, setDraft] = useState(""),
    [search, setSearch] = useState(""),
    [filter, setFilter] = useState("all"),
    [onlineIds, setOnlineIds] = useState(new Set()),
    [typingUser, setTypingUser] = useState(""),
    [error, setError] = useState(""),
    [connected, setConnected] = useState(false),
    [attachment, setAttachment] = useState(null),
    [uploadingAttachment, setUploadingAttachment] = useState(false),
    [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null),
    [activeCall, setActiveCall] = useState(null),
    [callStatus, setCallStatus] = useState(""),
    [muted, setMuted] = useState(false),
    [cameraOff, setCameraOff] = useState(false),
    [playbackBlocked, setPlaybackBlocked] = useState(false),
    [remoteTrackKinds, setRemoteTrackKinds] = useState(new Set()),
    [callDiagnostics, setCallDiagnostics] = useState([]);
  const socketRef = useRef(null),
    peerRef = useRef(null),
    localStreamRef = useRef(null),
    remoteStreamRef = useRef(null),
    localVideoRef = useRef(null),
    remoteVideoRef = useRef(null),
    remoteAudioRef = useRef(null),
    fileInputRef = useRef(null),
    selectedRef = useRef(""),
    contactsRef = useRef([]),
    activeCallRef = useRef(null),
    messagesEndRef = useRef(null),
    messagesScrollRef = useRef(null),
    typingTimerRef = useRef(null),
    pendingIceRef = useRef([]),
    iceServersRef = useRef(null);
  const shouldStickToBottomRef = useRef(true);
  useEffect(() => {
    selectedRef.current = selectedId;
  }, [selectedId]);
  useEffect(() => {
    contactsRef.current = contacts;
  }, [contacts]);
  useEffect(() => {
    activeCallRef.current = activeCall;
  }, [activeCall]);
  useEffect(() => {
    const container = messagesScrollRef.current;
    if (!container) return;

    if (shouldStickToBottomRef.current) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, typingUser, selectedId]);

  const loadContacts = useCallback(async () => {
    try {
      const response = await getChatContacts();
      const list = response.data?.data || [];
      setContacts(list);
      setSelectedId((current) => {
        const currentId = current || selectedRef.current;
        if (currentId && list.some((contact) => idOf(contact) === currentId)) {
          return currentId;
        }
        if (
          requestedUserId &&
          list.some((contact) => idOf(contact) === requestedUserId)
        ) {
          return requestedUserId;
        }
        return "";
      });
      socketRef.current?.emit(
        "presence:check",
        { userIds: list.map(idOf) },
        (result) => setOnlineIds(new Set(result?.onlineIds || [])),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load chats.");
    }
  }, [requestedUserId]);
  useEffect(() => {
    if (token) loadContacts();
  }, [token, loadContacts]);
  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    getChatMessages(selectedId)
      .then((response) => {
        setMessages(response.data?.data || []);
        socketRef.current?.emit("message:read", { from: selectedId });
        setContacts((items) =>
          items.map((item) =>
            idOf(item) === selectedId ? { ...item, unreadCount: 0 } : item,
          ),
        );
      })
      .catch((err) =>
        setError(err.response?.data?.message || "Unable to load messages."),
      );
    shouldStickToBottomRef.current = true;
  }, [selectedId]);

  const closePeer = useCallback(() => {
    peerRef.current?.close();
    peerRef.current = null;
    pendingIceRef.current = [];
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    remoteStreamRef.current = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    setIncomingCall(null);
    setActiveCall(null);
    setCallStatus("");
    setMuted(false);
    setCameraOff(false);
    setPlaybackBlocked(false);
    setRemoteTrackKinds(new Set());
    setCallDiagnostics([]);
  }, []);
  const ensureMedia = useCallback(async (type) => {
    const existing = localStreamRef.current;
    if (existing && (type !== "video" || existing.getVideoTracks().length > 0))
      return existing;
    existing?.getTracks().forEach((track) => track.stop());
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
      video:
        type === "video"
          ? {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: "user",
            }
          : false,
    });
    localStreamRef.current = stream;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.play().catch(() => {});
    }
    return stream;
  }, []);
  const playRemoteMedia = useCallback(async () => {
    const stream = remoteStreamRef.current;
    if (!stream) return;
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.muted = true;
      remoteVideoRef.current.playsInline = true;
    }
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = stream;
      remoteAudioRef.current.muted = false;
      remoteAudioRef.current.volume = 1;
      try {
        await remoteAudioRef.current.play();
        setPlaybackBlocked(false);
        return;
      } catch {
        setPlaybackBlocked(true);
      }
    }
  }, []);
  const enableRemoteAudio = useCallback(async () => {
    const stream = remoteStreamRef.current;
    if (!stream) return;

    try {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = stream;
        remoteAudioRef.current.muted = false;
        remoteAudioRef.current.volume = 1;
        await remoteAudioRef.current.play();
        setPlaybackBlocked(false);
        return;
      }
    } catch {}

    try {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
        remoteVideoRef.current.muted = false;
        await remoteVideoRef.current.play();
        setPlaybackBlocked(false);
        return;
      }
    } catch {}

    setPlaybackBlocked(true);
  }, []);
  const ensurePeer = useCallback(
    async (peerId, type) => {
      if (peerRef.current) return peerRef.current;
      if (!iceServersRef.current) {
        try {
          setCallDiagnostics((current) => [
            ...current.slice(-5),
            "Loading ICE/TURN configuration...",
          ]);
          const response = await getChatIceConfig();
          iceServersRef.current = response.data?.data?.iceServers || null;
          setCallDiagnostics((current) => [
            ...current.slice(-5),
            `ICE config loaded: ${Array.isArray(iceServersRef.current) ? iceServersRef.current.length : 0} server(s)`,
          ]);
        } catch (configError) {
          iceServersRef.current = null;
          setCallDiagnostics((current) => [
            ...current.slice(-5),
            "ICE config failed, falling back to STUN only",
          ]);
          setError(
            configError.response?.data?.message ||
              "TURN configuration could not be loaded.",
          );
        }
      }
      const configuration = {
        iceServers: iceServersRef.current || [
          { urls: "stun:stun.l.google.com:19302" },
        ],
        bundlePolicy: "max-bundle",
        iceCandidatePoolSize: 10,
      };
      const peer = new RTCPeerConnection(configuration);
      setCallDiagnostics((current) => [
        ...current.slice(-5),
        "PeerConnection created",
      ]);
      const stream = await ensureMedia(type);
      peer.addTransceiver("audio", { direction: "sendrecv" });
      if (type === "video")
        peer.addTransceiver("video", { direction: "sendrecv" });
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      setCallDiagnostics((current) => [
        ...current.slice(-5),
        `Local ${type} track(s) attached`,
      ]);
      const remoteStream = new MediaStream();
      remoteStreamRef.current = remoteStream;
      peer.onicecandidate = (event) => {
        if (event.candidate)
          setCallDiagnostics((current) => [
            ...current.slice(-5),
            `ICE candidate: ${event.candidate.type || "candidate"}`,
          ]);
        socketRef.current?.emit("webrtc:ice", {
          to: peerId,
          candidate: event.candidate,
        });
      };
      peer.ontrack = (event) => {
        const track = event.track;
        const incomingStream = event.streams?.[0];
        const activeRemoteStream = incomingStream || remoteStream;
        if (
          !incomingStream &&
          !activeRemoteStream.getTracks().some((item) => item.id === track.id)
        )
          activeRemoteStream.addTrack(track);
        remoteStreamRef.current = activeRemoteStream;
        setCallDiagnostics((current) => [
          ...current.slice(-5),
          `Remote ${track.kind} track received`,
        ]);
        setRemoteTrackKinds((current) => new Set([...current, track.kind]));
        const attachAndPlay = () => {
          requestAnimationFrame(() => playRemoteMedia());
        };
        track.onunmute = attachAndPlay;
        track.onended = () =>
          setRemoteTrackKinds((current) => {
            const next = new Set(current);
            next.delete(track.kind);
            return next;
          });
        attachAndPlay();
      };
      peer.onconnectionstatechange = () => {
        setCallDiagnostics((current) => [
          ...current.slice(-5),
          `Peer state: ${peer.connectionState}`,
        ]);
        if (peer.connectionState === "connected") {
          setCallStatus("Connected");
          playRemoteMedia();
        }
        if (peer.connectionState === "failed") {
          setError(
            "Media connection failed. A TURN server may be required for this network.",
          );
          closePeer();
        }
        if (peer.connectionState === "disconnected")
          setCallStatus("Connection interrupted. Reconnecting...");
        if (peer.connectionState === "closed") closePeer();
      };
      peer.oniceconnectionstatechange = () => {
        setCallDiagnostics((current) => [
          ...current.slice(-5),
          `ICE state: ${peer.iceConnectionState}`,
        ]);
        if (["checking", "new"].includes(peer.iceConnectionState))
          setCallStatus("Connecting media...");
        if (["connected", "completed"].includes(peer.iceConnectionState)) {
          setCallStatus("Connected");
          playRemoteMedia();
        }
        if (peer.iceConnectionState === "disconnected")
          setCallStatus("Connection interrupted. Reconnecting...");
      };
      peer.onicecandidateerror = (event) => {
        setCallDiagnostics((current) => [
          ...current.slice(-5),
          `ICE candidate error ${event.errorCode || ""}: ${event.errorText || "unknown"}`,
        ]);
        if (event.errorCode >= 700)
          setError(
            "TURN server could not be reached. Please check the TURN URL and credentials.",
          );
      };
      peerRef.current = peer;
      return peer;
    },
    [closePeer, ensureMedia, playRemoteMedia],
  );

  useEffect(() => {
    if (!token) return undefined;
    const socket = io(socketUrl, {
      auth: { token },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;
    socket.on("connect", () => {
      setConnected(true);
      setError("");
      const ids = contactsRef.current.map(idOf);
      socket.emit("presence:check", { userIds: ids }, (result) =>
        setOnlineIds(new Set(result?.onlineIds || [])),
      );
    });
    socket.on("disconnect", () => {
      setConnected(false);
      setOnlineIds(new Set());
    });
    socket.on("connect_error", (err) =>
      setError(err.message || "Realtime connection failed."),
    );
    socket.on("presence:update", ({ userId, online }) =>
      setOnlineIds((current) => {
        const next = new Set(current);
        online ? next.add(String(userId)) : next.delete(String(userId));
        return next;
      }),
    );
    socket.on("message:new", (message) => {
      const otherId =
        idOf(message.sender) === myId
          ? idOf(message.receiver)
          : idOf(message.sender);
      if (otherId === selectedRef.current) {
        setMessages((items) =>
          items.some((item) => idOf(item) === idOf(message))
            ? items
            : [...items, message],
        );
        socket.emit("message:read", { from: otherId });
      }
      loadContacts();
    });
    socket.on("typing", ({ from, typing }) => {
      if (String(from) === selectedRef.current)
        setTypingUser(typing ? String(from) : "");
    });
    socket.on("call:invite", ({ from, type, caller }) =>
      setIncomingCall({ from, type, caller }),
    );
    socket.on("call:accept", async ({ from, type }) => {
      try {
        setActiveCall({ peerId: from, type });
        setCallStatus("Connecting...");
        const peer = await ensurePeer(from, type);
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socket.emit("webrtc:offer", { to: from, description: offer, type });
      } catch (err) {
        setError(err.message);
        closePeer();
      }
    });
    socket.on("call:reject", () => {
      setError("Call declined.");
      closePeer();
    });
    socket.on("call:end", closePeer);
    socket.on("webrtc:offer", async ({ from, description, type }) => {
      try {
        const peer = await ensurePeer(from, type);
        await peer.setRemoteDescription(description);
        for (const candidate of pendingIceRef.current.splice(0))
          await peer.addIceCandidate(candidate);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit("webrtc:answer", { to: from, description: answer });
        setCallStatus("Connecting media...");
      } catch (err) {
        setError(err.message);
        closePeer();
      }
    });
    socket.on("webrtc:answer", async ({ description }) => {
      const peer = peerRef.current;
      if (!peer) return;
      await peer.setRemoteDescription(description);
      for (const candidate of pendingIceRef.current.splice(0))
        await peer.addIceCandidate(candidate);
      setCallStatus("Connecting media...");
    });
    socket.on("webrtc:ice", async ({ candidate }) => {
      if (!candidate) return;
      try {
        const peer = peerRef.current;
        if (peer?.remoteDescription) await peer.addIceCandidate(candidate);
        else pendingIceRef.current.push(candidate);
      } catch {}
    });
    return () => {
      socket.disconnect();
      socketRef.current = null;
      closePeer();
    };
  }, [token, myId, loadContacts, ensurePeer, closePeer]);
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
      localVideoRef.current.play().catch(() => {});
    }
    playRemoteMedia();
  }, [activeCall, playRemoteMedia]);

  const selected = contacts.find((contact) => idOf(contact) === selectedId);

  const setDraftEmoji = (emoji) => {
    setDraft((current) => `${current}${emoji}`);
  };

  const handleAttachmentUpload = async (file) => {
    if (!file) return;
    setError("");
    setUploadingAttachment(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadChatAttachment(formData);
      const uploaded = response.data?.data || response.data;
      setAttachment(uploaded);
      setShowEmojiPicker(false);
    } catch (err) {
      setError(err.response?.data?.message || "Attachment upload failed.");
    } finally {
      setUploadingAttachment(false);
    }
  };

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) => {
        const matches = `${contact.name} ${contact.email}`
          .toLowerCase()
          .includes(search.toLowerCase());
        return (
          matches &&
          (filter === "active"
            ? onlineIds.has(idOf(contact))
            : filter === "unread"
              ? contact.unreadCount > 0
              : true)
        );
      }),
    [contacts, search, filter, onlineIds],
  );
  const sendMessage = () => {
    const body = draft.trim();
    if (!body && !attachment) return;
    if (!selectedId) return;
    socketRef.current?.emit(
      "message:send",
      { to: selectedId, body, attachment },
      (result) => {
        if (!result?.ok) setError(result?.message || "Message failed.");
      },
    );
    setDraft("");
    setAttachment(null);
    setShowEmojiPicker(false);
    socketRef.current?.emit("typing", { to: selectedId, typing: false });
  };
  const onDraft = (value) => {
    setDraft(value);
    if (!selectedId) return;
    socketRef.current?.emit("typing", { to: selectedId, typing: true });
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(
      () =>
        socketRef.current?.emit("typing", { to: selectedId, typing: false }),
      1000,
    );
  };
  const startCall = async (type) => {
    if (!selectedId) return;
    if (!socketRef.current?.connected) {
      setError("Realtime connection is offline. Please wait for reconnection.");
      return;
    }
    try {
      await ensureMedia(type);
      setActiveCall({ peerId: selectedId, type });
      setCallStatus("Calling...");
      socketRef.current.emit(
        "call:invite",
        { to: selectedId, type },
        (result) => {
          if (!result?.ok) {
            setError(result.message);
            closePeer();
          }
        },
      );
    } catch (err) {
      setError(
        err.name === "NotAllowedError"
          ? "Microphone/camera permission was denied."
          : err.message,
      );
      closePeer();
    }
  };
  const acceptCall = async () => {
    const call = incomingCall;
    if (!call) return;
    try {
      await ensureMedia(call.type);
      setIncomingCall(null);
      setActiveCall({ peerId: call.from, type: call.type });
      setCallStatus("Connecting...");
      socketRef.current?.emit(
        "call:accept",
        { to: call.from, type: call.type },
        (result) => {
          if (!result?.ok) {
            setError(result.message);
            closePeer();
          }
        },
      );
    } catch {
      setError("Microphone/camera permission was denied.");
      socketRef.current?.emit("call:reject", { to: call.from });
      closePeer();
    }
  };
  const rejectCall = () => {
      if (incomingCall)
        socketRef.current?.emit("call:reject", { to: incomingCall.from });
      closePeer();
    },
    endCall = () => {
      const peerId = activeCallRef.current?.peerId;
      if (peerId) socketRef.current?.emit("call:end", { to: peerId });
      closePeer();
    },
    toggleMute = () => {
      const next = !muted;
      localStreamRef.current?.getAudioTracks().forEach((track) => {
        track.enabled = !next;
      });
      setMuted(next);
    },
    toggleCamera = () => {
      const next = !cameraOff;
      localStreamRef.current?.getVideoTracks().forEach((track) => {
        track.enabled = !next;
      });
      setCameraOff(next);
    };

  return (
    <main className="flex h-[90dvh] w-full flex-col gap-2 overflow-hidden bg-[#F6F7FB] font-sans md:flex-row md:gap-4">
      <aside
        className={`flex min-h-0 w-full flex-col overflow-hidden md:w-[300px] ${ui.card} ${ui.hover}`}
      >
        <header className="shrink-0 border-b border-gray-100 px-3 py-3 flex justify-between">
          <h1 className={ui.font.h1}>Chat Box</h1>
          <button
            onClick={() => document.getElementById("chat-search")?.focus()}
            className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
          >
            <FaPlus size={11} />
          </button>
        </header>
        <div className="shrink-0 px-3 py-2">
          <div className="flex items-center bg-gray-100 px-2 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FaSearch className="text-gray-400 mr-2 text-xs" />
            <input
              id="chat-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-transparent w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>
        <nav className="shrink-0 px-3">
          <div className="flex bg-gray-100 rounded-lg p-1 text-xs">
            {["all", "active", "unread"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`flex-1 rounded-md py-1 capitalize ${filter === item ? "bg-white font-medium shadow-sm" : "text-gray-500"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
        <section className="min-h-0 flex-1 overflow-y-auto px-2 py-2 space-y-1">
          {filteredContacts.map((contact) => {
            const contactId = idOf(contact);
            return (
              <article
                key={contactId}
                onClick={() => setSelectedId(contactId)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${selectedId === contactId ? "bg-blue-50" : "hover:bg-gray-50"}`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div className="relative w-9 h-9 shrink-0 rounded-full bg-gray-300 overflow-hidden">
                    {contact.avatar && (
                      <img
                        src={contact.avatar}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                    <span
                      className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${onlineIds.has(contactId) ? "bg-green-500" : "bg-gray-400"}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">
                      {contact.lastMessage?.body ||
                        contact.lastMessage?.attachment?.name ||
                        contact.email}
                    </p>
                    {onlineIds.has(contactId) && (
                      <p className="text-[10px] font-medium text-emerald-600">
                        Active
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400">
                    {timeOf(contact.lastMessage?.createdAt)}
                  </p>
                  {contact.unreadCount > 0 && (
                    <span className="inline-block mt-1 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
          {!filteredContacts.length && (
            <p className="p-4 text-center text-xs text-gray-500">
              {currentUser?.role === "teacher"
                ? "No booked students found."
                : "No booked instructors found."}
            </p>
          )}
        </section>
      </aside>
      <section
        className={`flex min-h-0 flex-1 flex-col overflow-hidden ${ui.card} ${ui.hover}`}
      >
        <header className="shrink-0 flex items-center justify-between border-b border-gray-100 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden">
              {selected?.avatar && (
                <img
                  src={selected.avatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                {selected?.name || "Select a conversation"}
              </h2>
              <p className="text-[11px] text-gray-500">
                {selected
                  ? !connected
                    ? "Connecting..."
                    : onlineIds.has(selectedId)
                      ? "Active now"
                      : "Offline"
                  : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <button
              disabled={!selected || !connected}
              onClick={() => startCall("video")}
              aria-label="Video call"
            >
              <FaVideo className="hover:text-blue-600 transition" />
            </button>
            <button
              disabled={!selected || !connected}
              onClick={() => startCall("audio")}
              aria-label="Audio call"
            >
              <FaPhone className="hover:text-blue-600 transition" />
            </button>
            <HiOutlineDotsHorizontal />
          </div>
        </header>
        {error && (
          <button
            onClick={() => setError("")}
            className="shrink-0 bg-red-50 px-4 py-2 text-left text-xs text-red-700"
          >
            {error}
          </button>
        )}
        <div
          ref={messagesScrollRef}
          onScroll={(e) => {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            shouldStickToBottomRef.current =
              scrollHeight - scrollTop - clientHeight < 120;
          }}
          className="min-h-0 flex-1 overflow-y-auto bg-[#F8FAFF] p-3 space-y-3 md:p-5"
        >
          {messages.map((message) => {
            const mine = idOf(message.sender) === myId;
            const attachment = message.attachment;
            const isImage = attachment?.type?.startsWith("image/");
            return (
              <div
                key={idOf(message)}
                className={`flex flex-col ${mine ? "items-end" : "items-start"}`}
              >
                <div
                  className={`${mine ? "bg-blue-100" : "bg-white border border-gray-100 shadow-sm"} p-2.5 rounded-xl max-w-[90%] md:max-w-md text-sm whitespace-pre-wrap break-words`}
                >
                  {message.body && <p>{message.body}</p>}
                  {attachment?.url && (
                    <div className={`${message.body ? "mt-2" : ""}`}>
                      {isImage ? (
                        <button
                          type="button"
                          onClick={() =>
                            downloadAttachment(
                              attachment.url,
                              attachment.name || "image",
                            )
                          }
                          className="block w-full overflow-hidden rounded-lg text-left"
                        >
                          <img
                            src={attachment.url}
                            alt={attachment.name || "Attachment"}
                            className="max-h-64 w-full rounded-lg object-cover"
                          />
                          <span className="mt-2 block text-[11px] text-slate-500">
                            Click to download
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            downloadAttachment(
                              attachment.url,
                              attachment.name || "Attachment",
                            )
                          }
                          className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-100"
                        >
                          <IoMdAttach className="text-sm" />
                          <span className="truncate">
                            {attachment.name || "Attachment"}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1">
                  {timeOf(message.createdAt)}
                </span>
              </div>
            );
          })}
          {typingUser && (
            <p className="text-xs text-gray-400">
              {selected?.name} is typing...
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>
        <footer className="shrink-0 border-t border-gray-100 bg-white p-2 md:p-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              handleAttachmentUpload(file);
              e.target.value = "";
            }}
          />
          <div className="mb-2 flex items-center gap-2">
            {showEmojiPicker && (
              <div className="flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setDraftEmoji(emoji)}
                    className="h-8 w-8 rounded-lg text-sm transition hover:bg-gray-100"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
            {attachment && (
              <div className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-slate-700">
                <span className="truncate max-w-[180px]">
                  {attachment.name}
                </span>
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="text-slate-500 hover:text-slate-900"
                >
                  ×
                </button>
              </div>
            )}
            {uploadingAttachment && (
              <span className="text-xs text-slate-500">Uploading...</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((current) => !current)}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
            >
              <BsEmojiSmile className="text-sm" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
            >
              <IoMdAttach className="text-sm" />
            </button>
            <input
              value={draft}
              disabled={!selected || !connected}
              onChange={(e) => onDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Message..."
              className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              disabled={
                (!draft.trim() && !attachment) ||
                !selected ||
                !connected ||
                uploadingAttachment
              }
              onClick={sendMessage}
              className="rounded-lg bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <FaPaperPlane size={12} />
            </button>
          </div>
        </footer>
      </section>
      {incomingCall && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto h-16 w-16 rounded-full bg-gray-200" />
            <h3 className="mt-4 text-lg font-semibold">
              {incomingCall.caller?.name || "Incoming call"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Incoming {incomingCall.type} call
            </p>
            <div className="mt-6 flex justify-center gap-5">
              <button
                onClick={rejectCall}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white"
              >
                <FaPhoneSlash />
              </button>
              <button
                onClick={acceptCall}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white"
              >
                <FaPhone />
              </button>
            </div>
          </div>
        </div>
      )}
      {activeCall && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950">
          <audio ref={remoteAudioRef} autoPlay playsInline />
          <div className="relative flex-1 overflow-hidden">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
            {activeCall.type === "video" &&
              callStatus === "Connected" &&
              !remoteTrackKinds.has("video") && (
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 text-sm text-white/70">
                  Waiting for opponent video...
                </p>
              )}
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="absolute bottom-5 right-5 h-36 w-24 rounded-xl bg-slate-800 object-cover shadow-xl md:h-48 md:w-36"
            />
            <div className="absolute left-0 top-0 p-5 text-white">
              <h3 className="font-semibold">
                {contacts.find((item) => idOf(item) === activeCall.peerId)
                  ?.name || "Call"}
              </h3>
              <p className="text-xs text-white/70">{callStatus}</p>
            </div>
            {callDiagnostics.length > 0 && (
              <div className="absolute bottom-20 left-4 max-w-[92%] rounded-xl bg-black/60 px-3 py-2 text-[11px] leading-5 text-white/80 backdrop-blur">
                {callDiagnostics.slice(-4).map((line, index) => (
                  <div key={`${line}-${index}`}>{line}</div>
                ))}
              </div>
            )}
            {playbackBlocked && (
              <button
                onClick={enableRemoteAudio}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-xl"
              >
                Tap to enable sound
              </button>
            )}
          </div>
          <div className="flex justify-center gap-4 bg-slate-900 p-5">
            <button
              onClick={toggleMute}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white"
            >
              {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            {activeCall.type === "video" && (
              <button
                onClick={toggleCamera}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white"
              >
                {cameraOff ? <FaVideoSlash /> : <FaVideo />}
              </button>
            )}
            <button
              onClick={endCall}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white"
            >
              <FaPhoneSlash />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
