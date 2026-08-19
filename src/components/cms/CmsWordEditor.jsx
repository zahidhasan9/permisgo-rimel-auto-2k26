"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";

function CmsWordEditor({ value = "", onChange }) {
  const [bundle, setBundle] = useState(null);
  const onChangeRef = useRef(onChange);
  const initialDataRef = useRef(value || "");
  const draftRef = useRef(value || "");

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let active = true;
    Promise.all([import("@ckeditor/ckeditor5-react"), import("ckeditor5")]).then(
      ([reactModule, editorModule]) => {
        if (active) setBundle({ CKEditor: reactModule.CKEditor, editorModule });
      },
    );
    return () => {
      active = false;
    };
  }, []);

  const editorConfig = useMemo(() => {
    if (!bundle) return null;
    const e = bundle.editorModule;
    return {
      licenseKey: "GPL",
      plugins: [
        e.Essentials,
        e.Paragraph,
        e.Heading,
        e.Bold,
        e.Italic,
        e.Underline,
        e.Strikethrough,
        e.FontFamily,
        e.FontSize,
        e.FontColor,
        e.FontBackgroundColor,
        e.Alignment,
        e.Autoformat,
        e.Link,
        e.List,
        e.Indent,
        e.IndentBlock,
        e.BlockQuote,
        e.HorizontalLine,
        e.Table,
        e.TableToolbar,
        e.RemoveFormat,
        e.SourceEditing,
        e.PasteFromOffice,
        e.FindAndReplace,
        e.Fullscreen,
        e.SpecialCharacters,
        e.SpecialCharactersEssentials,
        e.Undo,
      ],
      toolbar: {
        items: [
          "undo", "redo", "findAndReplace", "|", "heading", "|",
          "fontFamily", "fontSize", "fontColor", "fontBackgroundColor", "|",
          "bold", "italic", "underline", "strikethrough", "removeFormat", "|",
          "alignment", "bulletedList", "numberedList", "outdent", "indent", "|",
          "link", "specialCharacters", "blockQuote", "horizontalLine", "insertTable", "|", "sourceEditing", "fullscreen",
        ],
        shouldNotGroupWhenFull: false,
      },
      table: { contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"] },
      link: { addTargetToExternalLinks: true, defaultProtocol: "https://" },
      placeholder: "Write or paste content here…",
    };
  }, [bundle]);

  if (!bundle) {
    return <div className="min-h-40 animate-pulse rounded-xl border bg-slate-50 p-4 text-sm text-slate-400">Loading editor…</div>;
  }

  const { CKEditor, editorModule: e } = bundle;
  return (
    <div className="cms-word-editor">
      <CKEditor
        editor={e.ClassicEditor}
        data={initialDataRef.current}
        config={editorConfig}
        onChange={(_event, editor) => {
          draftRef.current = editor.getData();
          onChangeRef.current?.(draftRef.current);
        }}
        onBlur={() => onChangeRef.current?.(draftRef.current)}
      />
    </div>
  );
}

// The editor owns its live DOM and history. Parent form updates must not
// re-render this instance; page/language changes intentionally remount it via key.
export default memo(CmsWordEditor, () => true);
