import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './CKEditor.styles.css';

const CKEditor = ({ index, comment, handleCommentChange }) => {
  const [editorContent, setEditorContent] = useState(comment);

  const handleChange = (content) => {
    setEditorContent(content);
    handleCommentChange(index, content);
  };

  return (
<div>
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        placeholder={`Bienfait ${index + 1}`}
        className="quill-content"
      />

    </div>
  );
};

export default CKEditor;
