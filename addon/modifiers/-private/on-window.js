import { modifier } from "ember-modifier";

export default modifier((_element, event, [callback]) => {
  window.addEventListener(event, callback);

  return () => {
    window.removeEventListener(event, callback);
  };
});
