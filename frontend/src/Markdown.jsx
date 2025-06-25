import React from "react";
import Markdown from "react-markdown";

const Markdowns = () => {
  return (
    <>
      <h1>Markdown Guide</h1>
      <p>
        cat wiki allows users to add markdown to their wiki pages! below is the
        different types of markdown you can use on you pages{" "}
      </p>
      <h2>Headings</h2>
      <h4>add 1 to 3 "#"'s to determine the size of a heading</h4>
      <p># Heading 1</p>
      <Markdown># Heading 1</Markdown>
      <p>## Heading 2</p>
      <Markdown>## Heading 2</Markdown>
      <p>### Heading 3</p>
      <Markdown>### Heading 3</Markdown>

      <h2>Text Styling</h2>
      <p>**Bold Text**</p>
      <Markdown>**Bold Text**</Markdown>
      <p>*Italic Text*</p>
      <Markdown>*Italic Text*</Markdown>

      <h2>Lists</h2>
      <p>1. Ordered List</p>
      <p>2. Ordered List</p>
      <Markdown>1. Ordered List</Markdown>
      <Markdown>2. Ordered List</Markdown>

      <p>- Unordered List</p>
      <p>- Unordered List</p>
      <Markdown>- Unordered List</Markdown>
      <Markdown>- Unordered List</Markdown>

      <h2>Links</h2>
      <h4>[link name](link here)</h4>
      <p>[Link Name](https://www.youtube.com/)</p>
      <Markdown>
        [Link Name](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
      </Markdown>
      <h2>Images</h2>
      <p>![Image alt text](https://picsum.photos/200/300)</p>
      <Markdown>![Image alt text](https://picsum.photos/200/300)</Markdown>
    </>
  );
};

export default Markdowns;
