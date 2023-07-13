"use client";
import { Variants } from "framer-motion";
import { Diff } from "utility-types";
import React from "react";

// import { useAppSelector } from "@/hooks/reduxHooks";

const screenPopupVariant = {
  hidden: {
    // opacity: 0,
    // scale: 0,
    clipPath: `circle(0%)`,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  visible: {
    // opacity: 1,
    // scale: 1,
    clipPath: `circle(85%)`,
    transition: {
      type: "spring",
    },
  },
  exit: {
    zIndex: 99,
  },
};

// First we need to add a type to let us extend the incoming component.
/* type ExtraInfoType = {
  extraInfo: string;
};
// Mark the function as a generic using P (or whatever variable you want)
export function withExtraInfo<P>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts AND our extraInfo prop
  WrappedComponent: React.ComponentType<P & ExtraInfoType>
) {
  const [extraInfo, setExtraInfo] = useState("");
  setExtraInfo("important data.");

  const ComponentWithExtraInfo = (props: P) => {
    // At this point, the props being passed in are the original props the component expects.
    return <WrappedComponent {...props} extraInfo={extraInfo} />;
  };
  return ComponentWithExtraInfo;
} */

export type popupWrapperInfoType = {
  variants: Variants;
  initial: string;
  animate: string;
  exit: string;
};

// type Subtract<T, V> = Pick<T, Exclude<keyof T, keyof V>>;

/* function PopupWrapper<propsT>(
  OriginalComponent: React.ComponentType<propsT & popupWrapperInfoType>
): React.ComponentType<propsT> {
  const NewComponent = (props: propsT) => {
    //props here should not contain items in popupWrapperInfoType
    return (
      <OriginalComponent
        {...props}
        variants={screenPopupVariant}
        initial="hidden"
        animate="visible"
      />
    );
  };
  return NewComponent;
} */

/* function PopupWrapper<T>(
  Component: React.ComponentType<T>
): React.ComponentType<T & popupWrapperInfoType> {
  
  return (props: T) => (
    const currentPopups = useAppSelector((state) => state.popup.popups);
    <Component
      {...props}
      variants={screenPopupVariant}
      initial="hidden"
      animate="visible"
      popupStyle={`bg-gradient-to-br from-secondarylightmode to-secondarylightmode-dark dark:from-secondarydarkmode-light dark:to-secondarydarkmode fixed p-7 sm:p-9 shadow-2xl z-[${
        10 + currentPopups.length * 10
      }]`}
    />
  );
} */

function PopupWrapper<T extends {}>(Component: React.ComponentType<T>) {
  return class extends React.Component<Diff<T, popupWrapperInfoType>> {
    // extraInfo = {
    //   variants: screenPopupVariant,
    //   initial: "hidden",
    //   animate: "visible",
    //   popupStyle: `bg-gradient-to-br from-secondarylightmode to-secondarylightmode-dark dark:from-secondarydarkmode-light dark:to-secondarydarkmode fixed p-7 sm:p-9 shadow-2xl z-[${
    //     10 + this.currentPopups.length * 10
    //   }]`,
    // };
    render() {
      return (
        // <Component {...(this.props as T)} popupWrapperProps={this.extraInfo} />
        <Component
          {...(this.props as T)}
          variants={screenPopupVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        />
      );
    }
  };
}

export default PopupWrapper;
