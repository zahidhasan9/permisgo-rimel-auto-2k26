"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  BlockQuote, Bold, ClassicEditor, Essentials, Heading, Image, ImageCaption,
  ImageResize, ImageStyle, ImageToolbar, ImageUpload, Italic, Link, List,
  Paragraph, Table, TableToolbar, Underline, Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { uploadLearningEditorImage } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

class UploadAdapter {
  constructor(loader) { this.loader = loader; this.controller = new AbortController(); }
  async upload() {
    const file = await this.loader.file;
    const body = new FormData(); body.append("upload", file);
    const { data } = await uploadLearningEditorImage(body);
    return { default: mediaUrl(data?.data?.url) };
  }
  abort() { this.controller.abort(); }
}

function UploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => new UploadAdapter(loader);
}

export default function EbookEditor({ value, onChange }) {
  return <CKEditor editor={ClassicEditor} data={value || ""} config={{
    licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY || "GPL",
    plugins: [Essentials, Paragraph, Heading, Bold, Italic, Underline, Link, List, BlockQuote, Table, TableToolbar, Image, ImageCaption, ImageStyle, ImageResize, ImageToolbar, ImageUpload, Undo],
    extraPlugins: [UploadAdapterPlugin],
    toolbar: ["undo", "redo", "|", "heading", "|", "bold", "italic", "underline", "link", "|", "bulletedList", "numberedList", "blockQuote", "insertTable", "uploadImage"],
    image: { toolbar: ["imageStyle:inline", "imageStyle:block", "imageStyle:side", "|", "toggleImageCaption", "imageTextAlternative", "|", "resizeImage"] },
    table: { contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"] },
    placeholder: "Write Introduction, Rules Explained, Real-Life Examples, Remember Points, Common Mistakes and Exam Tips...",
  }} onChange={(_, editor) => onChange(editor.getData())} />;
}
