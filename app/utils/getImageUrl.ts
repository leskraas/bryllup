export type GetImageUrlOptions = {
  width?: number;
  height?: number;
  quality?: number;
};

export function getImageUrl(fileName: string, options?: GetImageUrlOptions) {
  const imageManipulations = options
    ? `tr:${options.width ? `w-${options.width},` : ""}${
        options.height ? `h-${options.height},` : ""
      }${options.quality ? `q-${options.quality},` : ""}`
    : "";
  return `https://ik.imagekit.io/lets/wedding/${imageManipulations}/${fileName}?ik-sdk-version=javascript-1.4.3`;
}
