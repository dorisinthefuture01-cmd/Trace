"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddressPicker } from "@/components/AddressPicker";
import { Upload } from "@/components/Upload";

const btnSecondary =
  "rounded-xl border border-zinc-200/90 bg-white px-4 py-2.5 text-[14px] font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-50";
const btnPrimary =
  "rounded-xl bg-zinc-800 px-4 py-2.5 text-[14px] font-medium text-white shadow-sm transition hover:bg-zinc-900";

const fieldClass =
  "w-full rounded-xl border border-zinc-200/90 bg-white py-3 px-3.5 text-[15px] text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200/50";

export function NewRecordForm() {
  const router = useRouter();
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <AddressPicker
        provinceSlug={province}
        citySlug={city}
        onProvinceChange={setProvince}
        onCityChange={setCity}
      />

      <label className="block">
        <span className="mb-2 block text-[13px] font-medium text-zinc-500">标题</span>
        <input type="text" placeholder="" className={fieldClass} />
      </label>

      <label className="block">
        <span className="mb-2 block text-[13px] font-medium text-zinc-500">日期</span>
        <input type="date" className={fieldClass} />
      </label>

      <div className="space-y-3">
        <Upload variant="image" />
        <Upload variant="video" />
      </div>

      <label className="block">
        <span className="mb-2 block text-[13px] font-medium text-zinc-500">旅行描述</span>
        <textarea
          rows={5}
          placeholder="写下这次旅行的感受…"
          className={`${fieldClass} resize-none leading-relaxed`}
        />
      </label>

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" className={btnSecondary} onClick={() => router.back()}>
          取消
        </button>
        <button type="submit" className={btnPrimary}>
          保存
        </button>
      </div>
    </form>
  );
}
