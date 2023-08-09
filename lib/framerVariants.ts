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
