import { pallettes } from "@/lib/pallettes";
import themes from "@/lib/theme";
import type { ISlideItems } from "@/types/slide-content";

export const fakeInitialData: ISlideItems[] = [
  {
    id: "1",
    contentItems: [
      {
        id: "1",
        values: [
          {
            attrs: {
              color: "linear-gradient(135deg, #52E5E7 0%, #130CB7 100%)",
              size: "44",
              font: "Bebas Neue",
              bold: true,
            },
            value: "Promoção Imperdível!",
          },
        ],
      },
      {
        id: "2",
        values: [
          {
            attrs: {
              color: "linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)",
              size: "32",
              bold: true,
            },
            value: "Descontos de até 50% em todos os produtos!",
          },
        ],
      },
      {
        id: "3",
        values: [
          {
            attrs: {
              color: "#3f51b5",
              size: "24",
            },
            value: "Aproveite antes que acabe!",
          },
        ],
      },

      {
        id: "4",
        type: "image",
        values: {
          attrs: { h: "100%", w: "100%" },
          value:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
        },
      },
    ],
  },
  {
    id: "2",
    contentItems: [
      {
        id: "1",
        values: [
          {
            attrs: {
              color: "linear-gradient(135deg, #52E5E7 0%, #130CB7 100%)",
              size: "44",
              font: "Bebas Neue",
              bold: true,
            },
            value: "Promoção Imperdível!",
          },
        ],
      },
      {
        id: "2",
        values: [
          {
            attrs: {
              color: "linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)",
              size: "32",
              bold: true,
            },
            value: "Descontos de até 50% em todos os produtos!",
          },
        ],
      },
      {
        id: "3",
        values: [
          {
            attrs: {
              color: "#3f51b5",
              size: "24",
            },
            value: "Aproveite antes que acabe!",
          },
        ],
      },

      {
        id: "4",
        type: "image",
        values: {
          attrs: { h: "100%", w: "100%" },
          value:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
        },
      },
    ],
  },
];
