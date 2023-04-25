import React, { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

export default function Guide({ content }) {
  const md = new MarkdownIt();
  const cc = md.render(content);
  return (
    <div className="section">
      <div className="markdown-section">
        <div dangerouslySetInnerHTML={{ __html: cc }}></div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const slug = "faq";
  const markdownWithMeta = fs.readFileSync(
    path.join("_md", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      content,
    },
  };
}
