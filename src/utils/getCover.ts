import { Camera, CameraResultType } from "@capacitor/camera";

const getCover = async () => {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
    });
    return photo.dataUrl!;
  } catch {
    throw new Error("获取图片失败");
  }
};

export default getCover;
