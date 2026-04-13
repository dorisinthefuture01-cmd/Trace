import type { TravelRecord } from "@/types/record";
import { RecordCard } from "@/components/RecordCard";

type Props = {
  records: TravelRecord[];
};

export function RecordList({ records }: Props) {
  if (records.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-300 bg-white px-4 py-14 text-center text-[14px] text-neutral-500">
        暂无记录
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {records.map((record) => (
        <li key={record.id}>
          <RecordCard record={record} />
        </li>
      ))}
    </ul>
  );
}
