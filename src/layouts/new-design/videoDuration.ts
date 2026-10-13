import fs from "node:fs";
import { publicFile } from "./publicFile";

/** The length of public/videos/<name>.mp4 as "m:ss" (read at build time); "" when the file is missing or unreadable. */
export function videoDuration(name: string): string {
  return mp4Duration(publicFile(`/videos/${name}.mp4`));
}

/** "m:ss" from the mp4's movie header (moov › mvhd); "" when the file is missing or unreadable. */
function mp4Duration(file: string): string {
  let buf: Buffer;
  try { buf = fs.readFileSync(file); } catch { return ""; }
  const child = (from: number, to: number, type: string): number => {
    for (let at = from; at + 8 <= to;) {
      const size = buf.readUInt32BE(at);
      if (buf.toString("latin1", at + 4, at + 8) === type) return at;
      if (size < 8) return -1;
      at += size;
    }
    return -1;
  };
  const moov = child(0, buf.length, "moov");
  if (moov < 0) return "";
  const mvhd = child(moov + 8, moov + buf.readUInt32BE(moov), "mvhd");
  if (mvhd < 0) return "";
  const v1 = buf[mvhd + 8] === 1;
  const timescale = buf.readUInt32BE(mvhd + (v1 ? 28 : 20));
  const units = v1 ? Number(buf.readBigUInt64BE(mvhd + 32)) : buf.readUInt32BE(mvhd + 24);
  const s = Math.round(units / timescale);
  return timescale ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : "";
}
