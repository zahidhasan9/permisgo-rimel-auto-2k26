import LearningContentForm from "../../_components/LearningContentForm";

export default async function EditLearningContentPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  return <LearningContentForm mode="edit" contentId={id} />;
}
