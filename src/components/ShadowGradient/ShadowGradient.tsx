import React from "react";
import { css } from "@emotion/react";

export default function ShadowGradient() {
  const shadowGradientStyles = css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    width: 100%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(120, 120, 120, 0) 50%,
      rgba(255, 255, 255, 1) 100%
    );

    /* outline: 1px solid red; */
  `;

  return <div css={shadowGradientStyles}></div>;
}
