import { Directory, Filesystem } from "@capacitor/filesystem";

const getCoverDataUrl = async (sha256: string) => {
  try {
    const file = await Filesystem.readFile({
      path: `covers/${sha256}`,
      directory: Directory.Data,
    });
    return `data:image/jpeg;base64,${file.data}`;
  } catch {
    throw new Error("获取封面失败");
  }
};

export default getCoverDataUrl;
