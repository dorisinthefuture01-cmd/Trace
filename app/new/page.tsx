import { NewRecordForm } from "@/components/NewRecordForm";

export default function NewPage() {
  return (
    <div className="min-h-dvh bg-neutral-100">
      <div className="mx-auto max-w-lg px-5 pb-16 pt-8">
        <header className="pb-8 text-center">
          <h1 className="text-[18px] font-semibold text-neutral-900">新增旅行记录页</h1>
        </header>
        <NewRecordForm />
      </div>
    </div>
  );
}
