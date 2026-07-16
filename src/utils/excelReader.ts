
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export interface LoginData {
    
    username: string;
    password: string;
    expected: string;
    run: boolean;
}

export class ExcelUtils {

    static readExcel(filePath: string, sheetName: string): any[] {

        const fullPath = path.resolve(filePath);

        console.log('Excel Path:', fullPath);

        if (!fs.existsSync(fullPath)) {
            throw new Error(`Excel file not found: ${fullPath}`);
        }

        const workbook = XLSX.readFile(fullPath);
        const worksheet = workbook.Sheets[sheetName];

        return XLSX.utils.sheet_to_json(worksheet);
    }
}
