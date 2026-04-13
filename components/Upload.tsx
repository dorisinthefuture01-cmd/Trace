"use client";

type Props = {
  variant?: "image" | "video";
  label?: string;
};

export function Upload({ variant = "image", label }: Props) {
  const text = label ?? (variant === "image" ? "+ 上传图片" : "+ 上传视频");
  return (
    <button
      type="button"
      className="w-full rounded-lg border border-neutral-300 bg-white py-3 text-[14px] text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50"
      disabled
      aria-disabled
    >
      {text}
    </button>
  );
}
