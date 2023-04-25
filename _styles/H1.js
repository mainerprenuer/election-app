import styled, { css } from "styled-components";
import { fontColor, primaryColor, darkFontColor } from "./colors";

//! Heading 1
export const H1 = ({ title, color, bold }) => {
  return <Style color={color}>{title}</Style>;
};

const Style = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  color: ${({ color }) => (color ? color : darkFontColor)};
`;

//! Heading 2
export const H2 = ({ title, color, bold }) => {
  return <Style color={color}>{title}</Style>;
};

const StyleH2 = styled.h2`
  font-size: 1.7rem;
  font-weight: ${({ bold }) => (bold ? 800 : 300)};
  color: ${({ color }) => (color ? color : fontColor)};
`;

//! Heading 3
export const H3 = ({ title, color, bold }) => {
  return <Style color={color}>{title}</Style>;
};

const StyleH3 = styled.h3`
  font-size: 1.5rem;
  font-weight: ${({ bold }) => (bold ? 800 : 300)};
  color: ${({ color }) => (color ? color : fontColor)};
`;

const shadow = css`
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;
