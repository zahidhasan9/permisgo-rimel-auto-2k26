import { redirect } from "next/navigation";

export default function LegacyEditLearningContentPage() {
  redirect("/admin/knowledge-sheets");
}
