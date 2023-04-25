import styled from "styled-components";

export const Button = ({
  onClickHandler,
  title,
  plain,
  bgColor,
  titleColor,
  width,
  height,
  type,
}) => {
  return (
    <StyledButton
      plain={plain}
      bgColor={bgColor}
      color={titleColor}
      width={width}
      height={height}
      onClick={onClickHandler}
      type={type || "button"}
    >
      {title}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "")};
  color: ${({ color }) => (color ? color : "#000")};
  background-color: ${({ plain, bgColor }) =>
    plain ? "transparent" : bgColor};
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;
