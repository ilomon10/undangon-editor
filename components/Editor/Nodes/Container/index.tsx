"use client";

import { UserComponent, useNode } from "@craftjs/core";
import { CSSProperties, ReactNode } from "react";
import { BoxSizing, BoxSizingProps } from "../../Settings/BoxSizing";
import { ContainerSettings } from "./ContainerSetting";
import { TypographyProps } from "../../Settings/Typogrphy";
import { Spacing, SpacingProps } from "../../Settings/Spacing";
import { ClassList, ClassListProps } from "../../Settings/ClassList";
import { cx } from "class-variance-authority";

type ContainerProps = {
  children?: ReactNode;
  boxSizing: BoxSizingProps;
  spacing: SpacingProps;
  classList: ClassListProps;
  typography: TypographyProps;
};

export const Container: UserComponent<Partial<ContainerProps>> = ({
  children,
  boxSizing,
  spacing,
  classList,
  typography,
}) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const style: CSSProperties = {
    ...spacing,
    ...boxSizing,
    ...typography,
  };

  const className = cx(
    (classList as ClassListProps).map(({ className }) => className)
  );

  return (
    <div ref={(ref) => connect(ref as any)} style={style} className={className}>
      {children}
    </div>
  );
};

Container.craft = {
  name: "Container",
  props: {
    boxSizing: BoxSizing.defaultValue,
    spacing: Spacing.defaultValue,
    classList: ClassList.defaultValue,
  },
  related: {
    settings: ContainerSettings,
  },
};
