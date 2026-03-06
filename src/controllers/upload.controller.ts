import { Request, Response } from 'express';
import { extractText, calculateAgeData } from '../services/extraction.service.js';

/**
 * ENDPOINT: /api/upload
 * Receives: Input data (firstName, lastName, dob) and File (multer)
 * Processes: OCR extraction and age calculation
 * Returns: ExtractionResult JSON
 */
export const handleUpload = async (req: Request, res: Response) => {
    try {
        // 1. Receive input data from request body and file from multer
        const { firstName, lastName, dob } = req.body;
        const file = req.file;

        // Validation check for required processing inputs
        if (!file || !firstName || !lastName || !dob) {
            return res.status(400).json({
                error: 'Required data (names, dob) or file missing.'
            });
        }

        // 2. Processing Details: Perform text extraction and age logic concurrently
        const [extractedText, ageData] = await Promise.all([
            extractText(file),
            calculateAgeData(dob)
        ]);

        // 3. Return the desired output
        res.json({
            fullName: `${firstName.trim()} ${lastName.trim()}`,
            age: ageData.years,
            detailedAge: ageData.friendlyAge,
            extractedText: extractedText.trim()
        });

    } catch (error: any) {
        // Error handling for processing failures (e.g., corrupted PDF or OCR timeout)
        console.error('Extraction Error:', error);
        res.status(500).json({
            error: error.message || 'An error occurred during file processing.'
        });
    }
};