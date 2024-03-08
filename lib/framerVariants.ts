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

export const filterSectionContainerVariant = {
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: { type: "tween", duration: 0.3 },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.5 },
  },
};

export const errorMessageModalContainerVariant = {
  hidden: {
    opacity: 0,
    y: -50,
    transition: { type: "tween", duration: 0.3 },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.5 },
  },
};
