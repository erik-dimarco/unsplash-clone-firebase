import { atom } from "recoil";
import { CardFields } from "../components/Cards";

export const selectedImageState = atom({
  key: "selectedImage",
  default: {} as CardFields,
});
