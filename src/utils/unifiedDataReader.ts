import path from 'path';
import { readCSV } from '../utils/csvReader';
import { ExcelUtils } from '../utils/excelReader';
import fs, { readFileSync } from 'fs';
/*
export function readData(filepath:string, sheetName?: string){
    const ext= path.extname(filepath).toLocaleLowerCase();

    switch(ext){
        case ".csv": console.log("System is reading CSV file");
            return readCSV(filepath);

        case ".xlsx": console.log("System is reading Excel file");
            return ExcelUtils.readExcel(filepath, sheetName || 'Sheet1');

        case ".json": console.log("System is reading JSON file");
            const JSONData= readFileSync(filepath, 'utf8');
            return JSON.parse(JSONData);
        
        default: throw new Error(`Unsupported File Type: ${ext}`);


    }
}

*/
//--------------------------------------------------------------------------------------------------------------------------------


//=====================================================

export interface LoginData {
    username: string;
    password: string;
    expected: string;
    run: boolean;
}


export function readData(
    filePath: string,
    sheetName?: string
): any[] {

    if (filePath.endsWith('.json')) {

        console.log('Reading JSON file...');

        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        if (jsonData.ValidUser || jsonData.InvalidUser) {
            return [
                ...(jsonData.ValidUser || []),
                ...(jsonData.InvalidUser || [])
            ];
        }

        return Array.isArray(jsonData)
            ? jsonData
            : [jsonData];
    }


    if (filePath.endsWith('.csv')) {

        console.log('Reading CSV file...');

        return readCSV(filePath);
    }


    if (
        filePath.endsWith('.xlsx') ||
        filePath.endsWith('.xls')
    ) {

        console.log('Reading Excel file...');

        return ExcelUtils.readExcel(
            filePath,
            sheetName || 'Sheet1'
        );
    }

    throw new Error(`Unsupported file type : ${filePath}`);
}
