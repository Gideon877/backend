OMS Assessment Backend API
==========================

A robust Node.js API built with TypeScript for extracting text from documents (PDFs and images) and calculating age metrics based on user data.

🚀 What it does
---------------

*   **OCR Extraction**: Converts images (PNG, JPG) into searchable text using Tesseract.js.
    
*   **PDF Parsing**: Extracts raw text content from PDF documents.
    
*   **Age Calculation**: Processes a Date of Birth to return both the current age in years and a detailed "friendly" string (e.g., "25 years, 2 months, 1 week").
    
*   **File Handling**: Manages multi-part form data uploads securely in memory.
    

🛠 Tech Stack & Dependencies
----------------------------

### Core

*   **Node.js & Express (v5.x)**: The foundation of the API. Chosen for its speed, huge ecosystem, and minimal overhead.
    
*   **TypeScript**: Used to ensure type safety, reduce runtime errors, and provide better developer tooling (IntelliSense).
    

### Chosen Dependencies (Why we use them)

*   **tesseract.js**: An OCR (Optical Character Recognition) engine. We chose this because it allows us to process images directly in the Node.js environment without needing to install external binary dependencies on the server.
    
*   **pdf-parse**: Used for text extraction from PDF files. It is lightweight and handles "searchable" PDF layers efficiently without requiring heavy external PDF engines.
    
*   **multer**: Middleware for handling multipart/form-data. We use memoryStorage to process files directly in RAM, which is faster and more secure for temporary extraction tasks than writing sensitive files to a disk.
    
*   **date-fns**: A modern JavaScript date utility library. We chose this over the native Date object or Moment.js because it is modular and immutable and provides easy functions like intervalToDuration for precise age calculation.
    
*   CORS: Essential for security. It allows us to control which frontends (e.g., your Next.js app) can talk to this API, preventing unauthorized cross-origin requests.
    
*   **dotenv**: Allows us to manage environment-specific configurations (like PORT or FRONTEND\_URL) without hardcoding them into the source code.
    

💻 Local Setup Instructions
---------------------------

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
    
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
    

### 1\. Clone the Repository

```bash
git clone [https://github.com/Gideon877/backend.git](https://github.com/Gideon877/backend.git)  cd backend   
```

### 2\. Install Dependencies

```bash
npm install  # or  yarn install   
```

### 3\. Environment Configuration

Create a .env file in the root directory:

```bash
=5000  FRONTEND_URL=http://localhost:3000   
```

### 4\. Running the App

**Development Mode (Auto-reload):**

```bash
npm run dev   
```

**Production Build:**

```bash
npm run build  npm start   
```

The server will be running at http://localhost:5000.

🛰 API Endpoints
----------------

### POST /api/upload

Accepts multipart/form-data.

**Body Fields:**

*   firstName: (String)
    
*   lastName: (String)
    
*   dob: (String, format YYYY-MM-DD)
    
*   file: (File - PDF or Image)
    

**Success Response (200 OK):**

```JSON
{    
    "fullName": "John Doe",    
    "age": 25,    
    "detailedAge": "25 years 2 months 1 day",    
    "extractedText": "...content of your file..." 
}   
```

### 👤 Author
* **GitHub:** [@gideon877](https://github.com/gideon877)
* **LinkedIn:** [in/gideon877](https://linkedin.com/in/gideon877)
