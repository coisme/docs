// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require("../../utils/slug");
import getElementTop from "../../utils/get-element-top";
import {TOCStyle, H2AnchorStyle, H3AnchorStyle, HeaderStyle} from "./styles";
import {useEffect, useState} from "react";

export default function TableOfContents({children, title}) {
  const headers = [];
  const stickyHeaderHeight = 54;
  let activeLink = 0;
  let previousLink = 0;
  useEffect(() => {
    const headerQueries = headers.map((header) => {
      return document.querySelector(`[id="${header}"]`);
    });
    document.addEventListener("scroll", () => {
      if (headers) {
        let i = headerQueries.findIndex(
          (e) => getElementTop(e, stickyHeaderHeight) - 3 > window.scrollY,
        );
        if (i === -1) {
          i = headers.length;
        }
        activeLink = i - 1;
        if (activeLink !== previousLink) {
          previousLink = activeLink;
          headers.forEach((header) => {
            document
              .querySelectorAll(`a[href="#${header}"]`)
              .forEach((aTag) => {
                aTag.classList.remove("active");
              });
          });
          if (activeLink >= 0) {
            const activeElement = headers[activeLink];
            document
              .querySelectorAll(`a[href="#${activeElement}"]`)
              .forEach((aTag) => {
                aTag.classList.add("active");
              });
            if (activeElement) {
              history.replaceState(
                undefined,
                document.title,
                "#" + activeElement,
              );
            }
          } else {
            history.replaceState(
              undefined,
              document.title,
              window.location.href.split("#")[0],
            );
          }
        }
      }
    });
  }, []);
  return (
    <TOCStyle>
      <HeaderStyle>
        <h4>{title}</h4>
      </HeaderStyle>
      {children.map(([name, level], index) => {
        const slugged = `#${slug(name)}`;
        headers.push(slug(name));
        const anchor = <a href={slugged}>{name}</a>;
        if (level === "h2")
          return <H2AnchorStyle key={index}>{anchor}</H2AnchorStyle>;
        else return <H3AnchorStyle key={index}>{anchor}</H3AnchorStyle>;
      })}
    </TOCStyle>
  );
}
