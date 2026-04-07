import * as XLSX from "xlsx";

export function exportWorkbook(sheets, fileName) {
  if (!sheets || sheets.length === 0) {
    alert("No hay datos para exportar");
    return;
  }

  const workbook = XLSX.utils.book_new();

  sheets.forEach((sheet) => {
    const data = sheet.data || [];
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
  });

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}