"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { getTeacherStudentBooklet, updateTeacherStudentBookletSkills } from "@/features/API";

const GROUPS = [
  { code: "C1", title: "MASTERING", heading: "Master vehicle handling in light or no traffic", color: "#a9c3ee", border: "#5d8bd6", skills: ["Know the main components and controls of the vehicle, perform interior and exterior checks.", "Enter, get into the driver's seat and get out.", "Hold, turn the steering wheel and maintain the trajectory.", "Start and stop.", "Control acceleration and braking at various speeds.", "Use the gearbox.", "Steer forward in a straight line and around a curve by adapting speed and trajectory.", "Look around and warn others.", "Perform a reverse manoeuvre and a U-turn safely."] },
  { code: "C2", title: "To Understand", heading: "Understanding the road and driving under normal conditions", color: "#f2a3aa", border: "#df5362", skills: ["Look for signs and useful clues and take them into account.", "Position the vehicle on the road and choose the traffic lane.", "Adapt your pace to the situation.", "Turn right and left in built-up areas.", "Detect, identify and cross intersections according to the priority system.", "Navigate roundabouts and traffic circles.", "Stop and park at an angle, perpendicularly and parallel."] },
  { code: "C3", title: "Driving", heading: "Driving in difficult conditions and sharing the road with other users", color: "#ead39b", border: "#c9a54d", skills: ["Assess and maintain safety distances.", "Cross, overtake and be overtaken.", "Negotiate turns and drive on slopes.", "Know the characteristics of other users and behave with respect and courtesy.", "Merge, move through and exit a highway.", "Drive in a line of vehicles and in heavy traffic.", "Drive in difficult weather and at night.", "Look around and warn others.", "Perform emergency manoeuvres safely."] },
  { code: "C4", title: "Practice", heading: "Practice autonomous, safe and economical driving", color: "#90dda9", border: "#48b873", skills: ["Follow a route independently.", "Prepare and make a safe journey.", "Know the main risk factors while driving.", "Understand vehicle maintenance and safety checks.", "Drive economically and reduce environmental impact.", "Apply safe driving behaviour in unfamiliar areas.", "Share the road responsibly with vulnerable users.", "Assess personal limitations and driving fitness.", "Plan continuous improvement after each lesson."] },
];
const STATUSES = [{ key: "not_acquired", label: "Not acquired" }, { key: "to_work", label: "To work" }, { key: "acquired", label: "Acquired" }];
const unwrap = (response, fallback = null) => response?.data?.data ?? response?.data ?? fallback;

export default function EvaluateStudentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [saved, setSaved] = useState({});
  const [marks, setMarks] = useState({});
  const [active, setActive] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { getTeacherStudentBooklet(id).then((response) => { const data = unwrap(response, {}); const values = Object.fromEntries((data.assessments || []).map((item) => [item.skill, item.status])); setStudent(data.student); setSaved(values); setMarks(values); }).catch((requestError) => setError(requestError.response?.data?.message || "Booklet could not be loaded.")); }, [id]);
  const percentages = useMemo(() => GROUPS.map((group) => group.skills.length ? Math.round((group.skills.filter((skill) => marks[skill] === "acquired").length / group.skills.length) * 100) : 0), [marks]);
  const group = GROUPS[active];

  const submit = async () => {
    const changes = group.skills.filter((skill) => marks[skill] && marks[skill] !== saved[skill]);
    if (!changes.length) { setNotice("No new changes to save."); return; }
    setSaving(true); setError(""); setNotice("");
    try { await updateTeacherStudentBookletSkills(id, changes.map((skill) => ({ skill, status: marks[skill], category: group.code }))); setSaved((old) => ({ ...old, ...Object.fromEntries(changes.map((skill) => [skill, marks[skill]])) })); setNotice(`${group.code} booklet saved successfully.`); }
    catch (requestError) { setError(requestError.response?.data?.message || "Booklet could not be saved."); }
    finally { setSaving(false); }
  };

  return <main className="min-h-screen bg-[#edf1f8] p-2 sm:p-4"><div className="mx-auto rounded-xl bg-white p-4"><header className="flex items-center gap-3"><button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={22} /></button><div><h1 className="text-xl font-bold text-[#123f88]">Evaluate Student</h1><p className="text-xs text-slate-500">{student?.name || student?.fullName || "Student"}</p></div></header>{error && <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</div>}{notice && <div className="mt-4 rounded-lg bg-green-50 p-3 text-xs text-green-700">{notice}</div>}
    <section className="mt-5 rounded-xl bg-[#e8eef7] p-3 sm:p-4"><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{GROUPS.map((item, index) => <button key={item.code} onClick={() => { setActive(index); setNotice(""); }} className={`relative min-h-[105px] rounded-xl border p-3 text-center transition ${active === index ? "shadow-md ring-2 ring-white" : "opacity-90"}`} style={{ backgroundColor: item.color, borderColor: item.border }}><span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold">{item.code}</span><p className="mt-2 text-xs font-bold text-[#123f88]">{item.title}</p><p className="mt-2 text-[10px] font-bold">{percentages[index]}%</p>{active === index && <span className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45" style={{ backgroundColor: item.color }} />}</button>)}</div>
      <div className="mt-4 min-h-[520px] rounded-xl bg-white p-4"><h2 className="text-sm font-bold text-[#123f88]">{group.code}. {group.heading}</h2><div className="mt-4 space-y-4">{group.skills.map((skill, index) => <div key={skill}><p className="text-[11px] text-slate-600"><b className="mr-2">{String(index + 1).padStart(2, "0")}</b>{skill}</p><div className="mt-2 grid max-w-[470px] grid-cols-3 gap-3">{STATUSES.map((status) => <button key={status.key} onClick={() => setMarks((old) => ({ ...old, [skill]: status.key }))} className={`rounded-lg px-3 py-2 text-[10px] font-medium transition ${marks[skill] === status.key ? status.key === "acquired" ? "bg-[#174a9b] text-white" : status.key === "to_work" ? "bg-amber-500 text-white" : "bg-slate-600 text-white" : "bg-[#e8eef7] text-slate-700"}`}>{status.label}</button>)}</div></div>)}</div><button disabled={saving} onClick={submit} className="mt-5 rounded-lg bg-[#df2339] px-5 py-3 text-xs font-bold text-white disabled:opacity-50">{saving ? "Saving..." : "Submit"}</button></div>
    </section></div></main>;
}
