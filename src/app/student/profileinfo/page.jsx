// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   FaCamera,
//   FaEnvelope,
//   FaGraduationCap,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaSave,
//   FaSpinner,
//   FaUser,
// } from "react-icons/fa";
// import { toast } from "sonner";

// import { getLoggedInUser, updateProfile } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// const emptyProfile = {
//   name: "",
//   email: "",
//   phone: "",
//   designation: "",
//   gender: "",
//   dateOfBirth: "",
//   address: "",
//   city: "",
//   country: "",
//   language: "",
//   bio: "",
//   avatar: "",
// };

// function getPayloadUser(response) {
//   return (
//     response?.data?.data?.user ||
//     response?.data?.user ||
//     response?.data?.data ||
//     null
//   );
// }

// function getErrorMessage(error, fallbackMessage) {
//   return error?.response?.data?.message || error?.message || fallbackMessage;
// }

// function formatDateInput(value) {
//   if (!value) {
//     return "";
//   }

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "";
//   }

//   return date.toISOString().slice(0, 10);
// }

// function mapUserToProfile(user = {}) {
//   return {
//     name: user.name || "",
//     email: user.email || "",
//     phone: user.phone || "",
//     designation: user.designation || "",
//     gender: user.gender || "",
//     dateOfBirth: formatDateInput(user.dateOfBirth),
//     address: user.address || "",
//     city: user.city || "",
//     country: user.country || "",
//     language: user.language || "",
//     bio: user.bio || "",
//     avatar: user.avatar || "",
//   };
// }

// function Field({
//   label,
//   name,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
//   icon: Icon,
//   disabled = false,
// }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">
//         {label}
//       </span>

//       <div className="relative">
//         {Icon ? (
//           <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//             <Icon size={14} />
//           </span>
//         ) : null}

//         <input
//           type={type}
//           name={name}
//           value={value || ""}
//           disabled={disabled}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`h-11 w-full rounded-xl border border-slate-200 bg-[#F7F9FC] px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50 ${
//             Icon ? "pl-9" : ""
//           } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
//         />
//       </div>
//     </label>
//   );
// }

// function SelectField({ label, name, value, onChange, children }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">
//         {label}
//       </span>

//       <select
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="h-11 w-full rounded-xl border border-slate-200 bg-[#F7F9FC] px-3 text-sm font-bold text-slate-800 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50"
//       >
//         {children}
//       </select>
//     </label>
//   );
// }

// export default function StudentProfilePage() {
//   const [profile, setProfile] = useState(emptyProfile);

//   const [avatarFile, setAvatarFile] = useState(null);

//   const [avatarPreview, setAvatarPreview] = useState("");

//   const [loading, setLoading] = useState(true);

//   const [saving, setSaving] = useState(false);

//   const displayImage = useMemo(() => {
//     if (avatarPreview) {
//       return avatarPreview;
//     }

//     if (profile.avatar) {
//       return mediaUrl(profile.avatar);
//     }

//     return "";
//   }, [avatarPreview, profile.avatar]);

//   const initial = useMemo(() => {
//     return String(profile.name || profile.email || "S")
//       .trim()
//       .charAt(0)
//       .toUpperCase();
//   }, [profile.name, profile.email]);

//   useEffect(() => {
//     let active = true;

//     async function loadProfile() {
//       try {
//         setLoading(true);

//         const response = await getLoggedInUser();

//         const user = getPayloadUser(response);

//         if (!user) {
//           throw new Error("Profile data not found.");
//         }

//         if (!active) {
//           return;
//         }

//         setProfile(mapUserToProfile(user));

//         localStorage.setItem("user", JSON.stringify(user));
//       } catch (error) {
//         if (active) {
//           toast.error(getErrorMessage(error, "Failed to load profile."));
//         }
//       } finally {
//         if (active) {
//           setLoading(false);
//         }
//       }
//     }

//     loadProfile();

//     return () => {
//       active = false;
//     };
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (avatarPreview) {
//         URL.revokeObjectURL(avatarPreview);
//       }
//     };
//   }, [avatarPreview]);

//   function handleProfileChange(event) {
//     const { name, value } = event.target;

//     setProfile((previousProfile) => ({
//       ...previousProfile,
//       [name]: value,
//     }));
//   }

//   function handleAvatarChange(event) {
//     const file = event.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

//     if (!allowedTypes.includes(file.type)) {
//       event.target.value = "";

//       toast.error("Only JPG, PNG and WEBP images are allowed.");

//       return;
//     }

//     if (file.size > 3 * 1024 * 1024) {
//       event.target.value = "";

//       toast.error("Image size must be less than 3MB.");

//       return;
//     }

//     if (avatarPreview) {
//       URL.revokeObjectURL(avatarPreview);
//     }

//     setAvatarFile(file);

//     setAvatarPreview(URL.createObjectURL(file));

//     toast.success("New profile image selected.");
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     if (!profile.name.trim()) {
//       toast.error("Full name is required.");

//       return;
//     }

//     try {
//       setSaving(true);

//       const formData = new FormData();

//       formData.append("name", profile.name.trim());

//       formData.append("phone", profile.phone || "");

//       formData.append("designation", profile.designation || "");

//       formData.append("gender", profile.gender || "");

//       formData.append("dateOfBirth", profile.dateOfBirth || "");

//       formData.append("address", profile.address || "");

//       formData.append("city", profile.city || "");

//       formData.append("country", profile.country || "");

//       formData.append("language", profile.language || "");

//       formData.append("bio", profile.bio || "");

//       if (avatarFile) {
//         formData.append("avatar", avatarFile);
//       }

//       const response = await updateProfile(formData);

//       const updatedUser = getPayloadUser(response);

//       if (!updatedUser) {
//         throw new Error("Profile update response not found.");
//       }

//       setProfile(mapUserToProfile(updatedUser));

//       setAvatarFile(null);
//       setAvatarPreview("");

//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       window.dispatchEvent(
//         new CustomEvent("profile-updated", {
//           detail: updatedUser,
//         }),
//       );

//       toast.success("Student profile updated successfully.");
//     } catch (error) {
//       toast.error(getErrorMessage(error, "Failed to update student profile."));
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-[#F7F9FC] p-4">
//         <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
//           <div className="flex items-center gap-3 text-sm font-black text-emerald-700">
//             <FaSpinner className="animate-spin" />
//             Loading student profile...
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#F7F9FC] p-3 md:p-4 lg:p-5">
//       <div className="mx-auto max-w-[1320px]">
//         <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
//           <div>
//             <div className="mb-1 flex flex-wrap items-center gap-1 text-xs font-bold text-slate-400">
//               <span>Student</span>

//               <span>/</span>

//               <span className="text-slate-600">Edit Profile</span>
//             </div>

//             <h1 className="text-2xl font-black text-slate-900">
//               Edit Student Profile
//             </h1>

//             <p className="mt-1 text-sm font-medium text-slate-500">
//               Update student information and profile image.
//             </p>
//           </div>

//           <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
//             {profile.email || "Student account"}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
//           <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
//             <div className="flex flex-col items-center text-center">
//               <div className="relative">
//                 {displayImage ? (
//                   <img
//                     src={displayImage}
//                     alt={
//                       profile.name
//                         ? `${profile.name} profile`
//                         : "Student profile"
//                     }
//                     className="h-36 w-36 rounded-3xl border border-slate-200 object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-emerald-600 text-5xl font-black text-white">
//                     {initial}
//                   </div>
//                 )}

//                 <label
//                   title="Change profile image"
//                   className="absolute -bottom-2 -right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border-4 border-white bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
//                 >
//                   <FaCamera size={16} />

//                   <input
//                     type="file"
//                     accept="image/jpeg,image/jpg,image/png,image/webp"
//                     onChange={handleAvatarChange}
//                     className="hidden"
//                   />
//                 </label>
//               </div>

//               <h2 className="mt-4 text-xl font-black text-slate-900">
//                 {profile.name || "Student User"}
//               </h2>

//               <p className="mt-1 text-sm font-semibold text-slate-500">
//                 {profile.designation || "Student"}
//               </p>

//               <div className="mt-4 w-full rounded-2xl bg-[#F7F9FC] p-3 text-left">
//                 <div className="mb-3 flex items-center gap-3 text-sm font-bold text-slate-600">
//                   <FaEnvelope className="shrink-0 text-emerald-600" />

//                   <span className="truncate">{profile.email || "-"}</span>
//                 </div>

//                 <div className="mb-3 flex items-center gap-3 text-sm font-bold text-slate-600">
//                   <FaPhoneAlt className="shrink-0 text-emerald-600" />

//                   <span>{profile.phone || "-"}</span>
//                 </div>

//                 <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
//                   <FaMapMarkerAlt className="shrink-0 text-emerald-600" />

//                   <span>
//                     {[profile.city, profile.country]
//                       .filter(Boolean)
//                       .join(", ") || "-"}
//                   </span>
//                 </div>
//               </div>

//               <p className="mt-3 text-xs font-semibold leading-5 text-slate-400">
//                 JPG, PNG or WEBP. Maximum size 3MB.
//               </p>
//             </div>
//           </aside>

//           <section>
//             <form
//               onSubmit={handleSubmit}
//               className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
//             >
//               <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
//                   <FaGraduationCap />
//                 </div>

//                 <div>
//                   <h2 className="text-lg font-black text-slate-900">
//                     Student Information
//                   </h2>

//                   <p className="text-sm font-medium text-slate-500">
//                     Update basic student account details.
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <Field
//                   label="Full Name"
//                   name="name"
//                   value={profile.name}
//                   onChange={handleProfileChange}
//                   placeholder="Enter full name"
//                   icon={FaUser}
//                 />

//                 <Field
//                   label="Email"
//                   name="email"
//                   value={profile.email}
//                   onChange={handleProfileChange}
//                   placeholder="Email"
//                   icon={FaEnvelope}
//                   disabled
//                 />

//                 <Field
//                   label="Phone"
//                   name="phone"
//                   value={profile.phone}
//                   onChange={handleProfileChange}
//                   placeholder="Enter phone number"
//                   icon={FaPhoneAlt}
//                 />

//                 <Field
//                   label="Student Type / Batch"
//                   name="designation"
//                   value={profile.designation}
//                   onChange={handleProfileChange}
//                   placeholder="Beginner / Driving Student"
//                   icon={FaGraduationCap}
//                 />

//                 <SelectField
//                   label="Gender"
//                   name="gender"
//                   value={profile.gender}
//                   onChange={handleProfileChange}
//                 >
//                   <option value="">Select gender</option>

//                   <option value="male">Male</option>

//                   <option value="female">Female</option>

//                   <option value="other">Other</option>
//                 </SelectField>

//                 <Field
//                   label="Date of Birth"
//                   name="dateOfBirth"
//                   type="date"
//                   value={profile.dateOfBirth}
//                   onChange={handleProfileChange}
//                 />

//                 <Field
//                   label="City"
//                   name="city"
//                   value={profile.city}
//                   onChange={handleProfileChange}
//                   placeholder="Enter city"
//                 />

//                 <Field
//                   label="Country"
//                   name="country"
//                   value={profile.country}
//                   onChange={handleProfileChange}
//                   placeholder="Enter country"
//                 />

//                 <Field
//                   label="Language"
//                   name="language"
//                   value={profile.language}
//                   onChange={handleProfileChange}
//                   placeholder="English / Bangla / French"
//                 />

//                 <Field
//                   label="Address"
//                   name="address"
//                   value={profile.address}
//                   onChange={handleProfileChange}
//                   placeholder="Enter address"
//                   icon={FaMapMarkerAlt}
//                 />
//               </div>

//               <label className="mt-4 block">
//                 <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">
//                   Bio
//                 </span>

//                 <textarea
//                   name="bio"
//                   value={profile.bio || ""}
//                   onChange={handleProfileChange}
//                   rows={4}
//                   maxLength={500}
//                   placeholder="Write a short student profile bio..."
//                   className="w-full resize-none rounded-xl border border-slate-200 bg-[#F7F9FC] px-3 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50"
//                 />

//                 <span className="mt-1 block text-right text-xs font-semibold text-slate-400">
//                   {(profile.bio || "").length}
//                   /500
//                 </span>
//               </label>

//               <div className="mt-5 flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
//                 >
//                   {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}

//                   {saving ? "Saving..." : "Save Student Profile"}
//                 </button>
//               </div>
//             </form>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaCamera,
  FaEnvelope,
  FaGlobe,
  FaIdBadge,
  FaLanguage,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSave,
  FaSpinner,
  FaUser,
  FaUserEdit,
  FaVenusMars,
} from "react-icons/fa";
import { toast } from "sonner";

import { getLoggedInUser, updateProfile } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const EMPTY_PROFILE = {
  name: "",
  email: "",
  phone: "",
  designation: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  city: "",
  country: "",
  language: "",
  bio: "",
  avatar: "",
};

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const ALLOWED_AVATAR_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_AVATAR_SIZE = 3 * 1024 * 1024;

const FIELDS = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Enter full name",
    icon: FaUser,
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Email address",
    icon: FaEnvelope,
    disabled: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter phone number",
    icon: FaPhoneAlt,
  },
  {
    name: "designation",
    label: "Student Type / Batch",
    placeholder: "Beginner / Driving student",
    icon: FaIdBadge,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    icon: FaVenusMars,
    options: GENDER_OPTIONS,
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    icon: FaCalendarAlt,
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter city",
    icon: FaMapMarkerAlt,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Enter country",
    icon: FaGlobe,
  },
  {
    name: "language",
    label: "Language",
    placeholder: "English / Bangla / French",
    icon: FaLanguage,
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter full address",
    icon: FaMapMarkerAlt,
  },
];

function getPayloadUser(response) {
  return (
    response?.data?.data?.user ||
    response?.data?.user ||
    response?.data?.data ||
    null
  );
}

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

function formatDateInput(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function mapUserToProfile(user = {}) {
  return {
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    designation: user.designation || "",
    gender: user.gender || "",
    dateOfBirth: formatDateInput(user.dateOfBirth),
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
    language: user.language || "",
    bio: user.bio || "",
    avatar: user.avatar || "",
  };
}

function FormField({ field, value, onChange }) {
  const {
    name,
    label,
    type = "text",
    placeholder,
    disabled,
    options = [],
    icon: Icon,
  } = field;

  const inputClassName = [
    "h-9 w-full rounded-lg border border-[#DDE6F3]",
    "bg-[#F7F9FC] px-2.5 text-[12.5px] font-semibold text-slate-800",
    "outline-none transition placeholder:text-slate-400",
    "focus:border-[#0D4598] focus:bg-white focus:ring-2 focus:ring-blue-50",
    "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400",
    Icon ? "pl-8" : "",
  ].join(" ");

  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.04em] text-slate-500">
        {label}
      </span>

      <div className="relative">
        {Icon ? (
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#0D4598]">
            <Icon size={12} />
          </span>
        ) : null}

        {type === "select" ? (
          <select
            name={name}
            value={value || ""}
            onChange={onChange}
            className={inputClassName}
          >
            <option value="">Select {label.toLowerCase()}</option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value || ""}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClassName}
          />
        )}
      </div>
    </label>
  );
}

function ProfileAvatar({ image, initial, name, onAvatarChange }) {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-[#DDE6F3] bg-[#F7F9FC] p-1.5 shadow-sm">
        {image ? (
          <img
            src={image}
            alt={name ? `${name} profile` : "Student profile"}
            className="h-24 w-24 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#0D4598] text-3xl font-black text-white">
            {initial}
          </div>
        )}
      </div>

      <label
        title="Change profile image"
        className="absolute -bottom-1.5 -right-1.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border-[3px] border-white bg-[#0D4598] text-white shadow-md transition hover:bg-[#083777]"
      >
        <FaCamera size={11} />

        <input
          type="file"
          accept={ALLOWED_AVATAR_TYPES.join(",")}
          onChange={onAvatarChange}
          className="hidden"
        />
      </label>
    </div>
  );
}

function LoadingScreen() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F4F7FB] p-2.5">
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-[#DDE6F3] bg-white shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0D4598]">
          <FaSpinner className="animate-spin" />
          Loading student profile...
        </div>
      </div>
    </main>
  );
}

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const displayImage = useMemo(() => {
    if (avatarPreview) return avatarPreview;
    if (profile.avatar) return mediaUrl(profile.avatar);
    return "";
  }, [avatarPreview, profile.avatar]);

  const initial = useMemo(() => {
    return String(profile.name || profile.email || "S")
      .trim()
      .charAt(0)
      .toUpperCase();
  }, [profile.name, profile.email]);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        setLoading(true);

        const response = await getLoggedInUser();
        const user = getPayloadUser(response);

        if (!user) {
          throw new Error("Profile data not found.");
        }

        if (!active) return;

        setProfile(mapUserToProfile(user));
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        if (active) {
          toast.error(
            getErrorMessage(error, "Failed to load student profile."),
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  function handleProfileChange(event) {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      event.target.value = "";
      toast.error("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      event.target.value = "";
      toast.error("Image size must be less than 3MB.");
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));

    toast.success("Profile image selected.");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!profile.name.trim()) {
      toast.error("Full name is required.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", profile.name.trim());
      formData.append("phone", profile.phone || "");
      formData.append("designation", profile.designation || "");
      formData.append("gender", profile.gender || "");
      formData.append("dateOfBirth", profile.dateOfBirth || "");
      formData.append("address", profile.address || "");
      formData.append("city", profile.city || "");
      formData.append("country", profile.country || "");
      formData.append("language", profile.language || "");
      formData.append("bio", profile.bio || "");

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await updateProfile(formData);
      const updatedUser = getPayloadUser(response);

      if (!updatedUser) {
        throw new Error("Profile update response not found.");
      }

      setProfile(mapUserToProfile(updatedUser));
      setAvatarFile(null);
      setAvatarPreview("");

      localStorage.setItem("user", JSON.stringify(updatedUser));

      window.dispatchEvent(
        new CustomEvent("profile-updated", {
          detail: updatedUser,
        }),
      );

      toast.success("Student profile updated successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update student profile."));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F4F7FB] p-2 md:p-2.5">
      <div className="mx-auto w-full max-w-[1180px]">
        <header className="mb-2.5 rounded-xl border border-[#DDE6F3] bg-white px-3.5 py-2.5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="mb-0.5 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <span>Student Panel</span>
                <span>/</span>
                <span className="text-[#0D4598]">Profile</span>
              </div>

              <h1 className="text-lg font-black leading-tight text-slate-900">
                Student Profile
              </h1>

              <p className="mt-0.5 text-xs font-medium text-slate-500">
                Manage student information and profile image.
              </p>
            </div>

            <div className="hidden min-w-0 items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 sm:flex">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0D4598] text-white">
                <FaUserEdit size={12} />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                  Account
                </p>

                <p className="max-w-[210px] truncate text-xs font-bold text-[#0D4598]">
                  {profile.email || "Student account"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[245px_minmax(0,1fr)]">
          <aside className="h-fit rounded-xl border border-[#DDE6F3] bg-white p-3 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <ProfileAvatar
                image={displayImage}
                initial={initial}
                name={profile.name}
                onAvatarChange={handleAvatarChange}
              />

              <h2 className="mt-3 max-w-full truncate text-base font-black text-slate-900">
                {profile.name || "Student User"}
              </h2>

              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                {profile.designation || "Student"}
              </p>

              <div className="mt-3 w-full space-y-1.5 border-t border-slate-100 pt-3 text-left">
                <div className="flex items-center gap-2 rounded-lg bg-[#F7F9FC] px-2.5 py-2">
                  <FaEnvelope className="shrink-0 text-[#0D4598]" size={11} />

                  <div className="min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
                      Email
                    </p>

                    <p className="truncate text-[11px] font-semibold text-slate-700">
                      {profile.email || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-[#F7F9FC] px-2.5 py-2">
                  <FaPhoneAlt className="shrink-0 text-[#0D4598]" size={11} />

                  <div className="min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
                      Phone
                    </p>

                    <p className="truncate text-[11px] font-semibold text-slate-700">
                      {profile.phone || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-[#F7F9FC] px-2.5 py-2">
                  <FaMapMarkerAlt
                    className="shrink-0 text-[#0D4598]"
                    size={11}
                  />

                  <div className="min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="truncate text-[11px] font-semibold text-slate-700">
                      {[profile.city, profile.country]
                        .filter(Boolean)
                        .join(", ") || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-[9px] font-semibold leading-4 text-slate-400">
                JPG, PNG or WEBP · Maximum 3MB
              </p>
            </div>
          </aside>

          <section className="rounded-xl border border-[#DDE6F3] bg-white shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-[#E5EAF2] px-3.5 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0D4598]">
                <FaUserEdit size={13} />
              </div>

              <div>
                <h2 className="text-sm font-black text-slate-900">
                  Personal Information
                </h2>

                <p className="text-[11px] font-medium text-slate-500">
                  Update the student account details below.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-3.5">
              <div className="grid grid-cols-1 gap-x-3 gap-y-2.5 md:grid-cols-2">
                {FIELDS.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={profile[field.name]}
                    onChange={handleProfileChange}
                  />
                ))}
              </div>

              <label className="mt-2.5 block">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.04em] text-slate-500">
                    Bio
                  </span>

                  <span className="text-[9px] font-semibold text-slate-400">
                    {(profile.bio || "").length}/500
                  </span>
                </div>

                <textarea
                  name="bio"
                  value={profile.bio || ""}
                  onChange={handleProfileChange}
                  rows={2}
                  maxLength={500}
                  placeholder="Write a short student profile bio..."
                  className="w-full resize-none rounded-lg border border-[#DDE6F3] bg-[#F7F9FC] px-2.5 py-2 text-[12.5px] font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0D4598] focus:bg-white focus:ring-2 focus:ring-blue-50"
                />
              </label>

              <div className="mt-2.5 flex justify-end border-t border-[#E5EAF2] pt-2.5">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-9 min-w-[145px] items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white shadow-sm transition hover:bg-[#083777] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaSave size={12} />
                  )}

                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
