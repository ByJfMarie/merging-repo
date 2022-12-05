import React, { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
// import './pdf.css'

const ManageReportPDF = () => {

    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;;
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
  
    return (
        <>
            <div className="pdf h-full w-full">
                <Document
                    file="https://cors-anywhere.herokuapp.com/https://web.umons.ac.be/app/uploads/sites/37/2018/06/Guide-El%C3%A9mentaire-pour-la-R%C3%A9daction-dun-Rapport-de-Projet.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="h-full w-full"
                ><Page  pageNumber={1} height='450' renderAnnotationLayer={false} renderTextLayer={false} /></Document>
            </div>
        </>
    );
};

export default ManageReportPDF;