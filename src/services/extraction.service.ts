import Tesseract from 'tesseract.js';
import { PDFParse } from 'pdf-parse';
import { intervalToDuration, formatDuration } from 'date-fns';
/**
 * SERVICE: Extraction & Processing Details
 * Handles the logic for OCR (images) and text extraction (PDFs).
 */


/**
 * Logic for Age Calculation
 * Satisfies requirement: "Processing Details" for age calculation
 */
export const calculateAgeData = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const duration = intervalToDuration({ start: birthDate, end: today });

    return {
        years: duration.years || 0,
        friendlyAge: formatDuration(duration, {
            format: ['years', 'months', 'weeks', 'days']
        }) || '0 days'
    };
};

/**
 * Processes the uploaded file and returns extracted text.
 * Satisfies requirement: "Text (from tesseract or pdf parsing tool)"
 */
export const extractText = async (file: Express.Multer.File): Promise<string> => {
    if (file.mimetype === 'application/pdf') {
        // PDFParse v2 uses a class-based approach
        const parser = new PDFParse({ data: file.buffer });

        try {
            const result = await parser.getText();
            return result.text;
        } finally {
            // Important: Documentation says to always destroy to free memory
            await parser.destroy();
        }
    }

    if (file.mimetype.startsWith('image/')) {
        const { data: { text } } = await Tesseract.recognize(file.buffer, 'eng');
        return text;
    }

    throw new Error('Invalid file type. Upload an image or PDF.');
};