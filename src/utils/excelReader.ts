
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export function readExcel(filepath: string, sheetName: string) {

    const fullPath = path.resolve(filepath);

    console.log('File path received:', filepath);
    console.log('Full path is:', fullPath);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Excel file not found: ${fullPath}`);
    }

    const workbook = XLSX.readFile(fullPath);

    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
        throw new Error(`Sheet '${sheetName}' does not exist`);
    }

    return XLSX.utils.sheet_to_json(sheet);
}
