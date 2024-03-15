import { jsPDF } from "jspdf";

function print_resume() {
    // // Assuming you have an element with the ID "content" that contains your resume
    // const content = document.getElementById('content');

    // // Options for the PDF generation (optional)
    // const options = {
    // margin: 10,
    // filename: 'resume.pdf',
    // image: { type: 'jpeg', quality: 0.98 },
    // html2canvas: { scale: 2 },
    // jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    // };

    // // Use html2pdf library to generate the PDF
    // html2pdf().from(content).set(options).outputPdf();

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");


}

print_resume();
