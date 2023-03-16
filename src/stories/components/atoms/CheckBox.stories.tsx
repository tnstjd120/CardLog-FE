import React from "react";
import { Story } from "@storybook/api";
import CheckBox, { CheckBoxProps } from "../../../components/common/CheckBox";

export default {
  title: "Components/Atoms/CheckBox",
  component: CheckBox,
};

export const Default = ({ ...args }: CheckBoxProps): JSX.Element => {
  return (
    <>
      <CheckBox {...args} />
    </>
  );
};
