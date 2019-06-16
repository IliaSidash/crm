export function tooltip(node, options) {
  const tooltip = M.Tooltip.init(node, options);

  const instance = M.Tooltip.getInstance(node);

  return {
    destroy() {
      if (tooltip && tooltip.destroy) {
        instance.destroy();
      }
    }
  };
}
