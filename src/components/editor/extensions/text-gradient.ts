import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

export type TextGradientOptions = {
  types: string[];
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    colorG: {
      /**
       * Set the color gradient
       */
      setColorG: (colorg: string) => ReturnType;
      /**
       * Unset the color gradient
       */
      unsetColorG: () => ReturnType;
    };
  }
}

export const ColorG = Extension.create<TextGradientOptions>({
  name: "colorG",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          colorG: {
            default: null,
            parseHTML: (element) => element.style.background.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.colorG) {
                return {};
              }

              return {
                style: `background: ${attributes.colorG} text; -webkit-text-fill-color: transparent; transition: all 200ms ease-in-out;`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setColorG:
        (colorG) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { colorG }).run();
        },
      unsetColorG:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { colorG: null }).removeEmptyTextStyle().run();
        },
    };
  },
});
