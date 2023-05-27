import React from 'react'
import ReactMarkdown from "react-markdown";

const App = () => {

  const [input, setInput] = React.useState('# Welcome to Editor\nFeel free to edit text here!');

  return (
    <div className='editor__page'>
      <textarea className='main__editor' value={input} onChange={(e) => {setInput(e.target.value)}}></textarea>
      <div className="markdown__side">
        <ReactMarkdown children={input}></ReactMarkdown>
      </div>
    </div>
  )
}

export default App