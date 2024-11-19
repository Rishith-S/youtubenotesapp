import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import { useEffect, useRef } from "react";

export function Editor() {
  const editorRef = useRef<EditorJS | null>(null);

  const initEditor = () => {
    const editor = new EditorJS({
      data:{
        blocks:[]
      },
      holder: "editorjs",
      placeholder: "Write your notes",
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          inlineToolbar: ["link"],
          config: {
              levels: [1,2,3,4]
          }
        },
        list: {
          class: EditorjsList as unknown as ToolConstructable,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        table: Table,
        code:CodeTool,
      },
      autofocus:true,
      onChange: async ()=>{
        const data = await editor.save()
        console.log(data);
      }
    });
    editorRef.current = editor;
  };

  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
    }
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <article className="prose lg:prose-xl"><div className="editorjs text-white" id="editorjs"></div></article>;
}
