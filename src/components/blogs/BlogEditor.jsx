"use client";

import { useEffect, useRef } from "react";
import { FiBold, FiItalic, FiLink, FiList, FiUnderline } from "react-icons/fi";

const ToolbarButton = ({ label, title, onAction, children }) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    onMouseDown={(event) => {
      event.preventDefault();
      onAction();
    }}
    className="flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-[#174a9b]"
  >
    {children || label}
  </button>
);

export default function BlogEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const selectionRef = useRef(null);

  useEffect(() => {
    if (
      editorRef.current &&
      document.activeElement !== editorRef.current &&
      editorRef.current.innerHTML !== (value || "")
    ) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const rememberSelection = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount || !editorRef.current) return;
    const range = selection.getRangeAt(0);
    if (editorRef.current.contains(range.commonAncestorContainer)) {
      selectionRef.current = range.cloneRange();
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (!selection || !selectionRef.current) return;
    selection.removeAllRanges();
    selection.addRange(selectionRef.current);
  };

  const run = (command, commandValue = null) => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(command, false, commandValue);
    rememberSelection();
    onChange(editorRef.current?.innerHTML || "");
  };

  const addLink = () => {
    const url = window.prompt("Enter the link URL:", "https://");
    if (url) run("createLink", url);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-[#174a9b]">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-2">
        <select
          aria-label="Text format"
          defaultValue="p"
          onMouseDown={rememberSelection}
          onChange={(event) => run("formatBlock", event.target.value)}
          className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-700 outline-none"
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
        <span className="mx-1 h-6 w-px bg-slate-200" />
        <ToolbarButton title="Bold" onAction={() => run("bold")}>
          <FiBold />
        </ToolbarButton>
        <ToolbarButton title="Italic" onAction={() => run("italic")}>
          <FiItalic />
        </ToolbarButton>
        <ToolbarButton title="Underline" onAction={() => run("underline")}>
          <FiUnderline />
        </ToolbarButton>
        <ToolbarButton title="Add link" onAction={addLink}>
          <FiLink />
        </ToolbarButton>
        <span className="mx-1 h-6 w-px bg-slate-200" />
        <ToolbarButton
          title="Bulleted list"
          onAction={() => run("insertUnorderedList")}
        >
          <FiList />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          label="1."
          onAction={() => run("insertOrderedList")}
        />
        <ToolbarButton
          title="Quote"
          label="❝"
          onAction={() => run("formatBlock", "blockquote")}
        />
        <ToolbarButton
          title="Clear formatting"
          label="Clear"
          onAction={() => run("removeFormat")}
        />
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        data-placeholder="Write driving tips, safety guidance, examples and test preparation advice..."
        onInput={(event) => {
          rememberSelection();
          onChange(event.currentTarget.innerHTML);
        }}
        onMouseUp={rememberSelection}
        onKeyUp={rememberSelection}
        onFocus={rememberSelection}
        onBlur={(event) => onChange(event.currentTarget.innerHTML)}
        className="blog-editable min-h-[320px] px-5 py-4 text-[15px] leading-7 text-slate-700 outline-none"
      />
    </div>
  );
}
