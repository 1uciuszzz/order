const getSha256 = async (dataUrl: string) => {
  try {
    const raw = atob(dataUrl.split(",")[1]);
    const arr = new Uint8Array(new ArrayBuffer(raw.length));
    for (let i = 0; i < raw.length; i++) {
      arr[i] = raw.charCodeAt(i);
    }
    const buffer = await crypto.subtle.digest("SHA-256", arr);
    const hashArray = Array.from(new Uint8Array(buffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  } catch {
    throw new Error("获取图片哈希失败");
  }
};

export default getSha256;
