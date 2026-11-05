import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error('Image read nahi ho payi'));
    reader.onload = () => {
      const value = String(reader.result || '');
      resolve(value.substring(value.indexOf(',') + 1));
    };
    reader.readAsDataURL(blob);
  });
}

window.fixPaintNativeSave = async (blob) => {
  if (!Capacitor.isNativePlatform()) throw new Error('Android app mode nahi mila');
  const base64 = await blobToBase64(blob);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const path = `FixPaint/fix-paint-${stamp}.png`;
  await Filesystem.writeFile({
    path,
    data: base64,
    directory: Directory.Documents,
    recursive: true,
  });
  return { path };
};
