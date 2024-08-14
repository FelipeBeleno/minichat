"use client"
import { Button } from '@nextui-org/react';
import { FC, ReactNode } from 'react';
import * as XLSX from 'xlsx';


type Props = {
    data: any[]
};

const ExportExcel: FC<Props> = ({ data }) => {


    const exportToExcel = () => {

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');


        XLSX.writeFile(workbook, 'usuarios.xlsx');
    };

    return (

        <Button onClick={exportToExcel} color="primary" fullWidth>
            Descargar
        </Button>

    );
};

export default ExportExcel;
