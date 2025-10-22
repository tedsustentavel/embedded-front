// Provide a minimal useStyles compatibility function so components can call it
// This avoids depending on Mantine's createStyles implementation which can vary
export const useStyles = () => {
  return {
    classes: {
      header: "",
      footer: "",
      link: "",
      linkIcon: "",
      linkActive: "",
    },
  } as const;
};
