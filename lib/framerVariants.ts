export const atmDetailModalVariant = {
  hidden: {
    opacity: 0.3,
    y: 150,
    //   scale: 0.3,
    transition: {
      type: "tween",
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    //   scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};

export const verticalMovementOnlyVariant = {
  hidden: {
    y: "-80%",
  },
  show: {
    y: 0,
  },
};

export const opacityOnlyVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export const errorMessageModalContainerVariant = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};
