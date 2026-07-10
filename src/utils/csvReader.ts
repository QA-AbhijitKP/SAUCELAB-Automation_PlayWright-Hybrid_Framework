import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function readCSV(filePath: string): any[] {
    const fullPath = path.resolve(process.cwd(), filePath);

    console.log('Reading CSV:', fullPath);

    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });

    return records;
}