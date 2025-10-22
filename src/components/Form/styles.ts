// Simple compatibility layer for styles: return a classes object expected by pages
export const useStyles = () => {
  return { classes: { smallInput: "" } } as const;
};
