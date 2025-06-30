export default function FileDragDropZone() {
  return (
    <section className="border-4 border-dotted border-slate-500 flex flex-col items-center justify-center py-20">
      <input type="file" className="" />
      <p>파일을 여기에 드래그하거나 클릭하여 업로드하세요.</p>
    </section>
  );
}
