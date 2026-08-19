"use client";

import { memo, useMemo, useRef } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  List,
  Paragraph,
  Table,
  TableToolbar,
  Underline,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { uploadLearningEditorImage } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.controller = new AbortController();
  }
  async upload() {
    const file = await this.loader.file;
    const body = new FormData();
    body.append("upload", file);
    const { data } = await uploadLearningEditorImage(body);
    return { default: mediaUrl(data?.data?.url) };
  }
  abort() {
    this.controller.abort();
  }
}

function UploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
    new UploadAdapter(loader);
}

function EbookEditor({ value, onChange }) {
  const initialDataRef = useRef(value || "");
  const onChangeRef = useRef(onChange);
  const config = useMemo(() => ({
    licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY || "GPL",
    plugins: [
      Essentials, Paragraph, Heading, Bold, Italic, Underline, Link, List,
      BlockQuote, Table, TableToolbar, Image, ImageCaption, ImageStyle,
      ImageResize, ImageToolbar, ImageUpload, Undo,
    ],
    extraPlugins: [UploadAdapterPlugin],
    toolbar: {
      items: [
        "undo", "redo", "|", "heading", "|", "bold", "italic",
        "underline", "link", "|", "bulletedList", "numberedList",
        "blockQuote", "insertTable", "uploadImage",
      ],
      shouldNotGroupWhenFull: false,
    },
    image: {
      toolbar: [
        "imageStyle:inline", "imageStyle:block", "imageStyle:side", "|",
        "toggleImageCaption", "imageTextAlternative", "|", "resizeImage",
      ],
    },
    table: { contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"] },
    placeholder: "Write Introduction, Rules Explained, Real-Life Examples, Remember Points, Common Mistakes and Exam Tips...",
  }), []);
  return (
    <div className="cms-word-editor">
      <CKEditor
        editor={ClassicEditor}
        data={initialDataRef.current}
        config={config}
        onChange={(_, editor) => onChangeRef.current?.(editor.getData())}
      />
    </div>
  );
}

export default memo(EbookEditor, () => true);
