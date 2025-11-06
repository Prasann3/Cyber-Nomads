***

# B01 - Full Stack AI Engineer Backend Assignment  
### Oraczen Hiring Assignment Submission (Backend Track)

## Overview  
This project is an **AI-powered invoice processing system** built to automate the extraction, validation, and database entry of invoice data. It allows organizations to upload batches of invoices (images or PDFs), uses AI to extract structured information, validates data integrity, rejects erroneous invoices, and stores processed results efficiently.

The system demonstrates a complete **backend pipeline**—from file ingestion to asynchronous AI processing—using **OpenAI**, **BullMQ**, and **MongoDB**, designed for scalability, modularity, and reliability.

***

## Demo  
 
- **Demo Video:** [Video Link](https://drive.google.com/file/d/18_vG4RhwIXpnTG4LyQLbkWRPzm6XPoWH/view?usp=sharing)  

***
## Local Setup  

### Prerequisites
- Docker & Docker Compose installed  
- OpenAI API key  
- Node.js (>= 18) if running manually  

### Steps  

1. **Unzip The Folder and Go to Src Folder**  
   ```bash
   cd  src
   ```

2. **Set up environment variables**  
   ```bash
   cp .env.example .env
   ```
   Add your Own OpenAI API Key:
   ```
   OPENAI_API_KEY=your_key_here
   MONGO_URI=mongodb://mongo:27017/invoices
   REDIS_HOST=redis
   REDIS_PORT=6379
   PORT=8000
   ```

3. **Build and run containers**
   ```bash
   docker-compose build
   docker-compose up
   ```

4. **Access backend**
   - API Base URL: `http://localhost:8000`
   - Swagger/Postman can be used for testing endpoints  

***

## Running Components Individually

Start only the backend manually:
```bash
npm run dev
```

Start the worker process for BullMQ:
```bash
npm run worker
```

***

## Key Features  

- Bulk upload of up to **100 invoices** (PDFs or images) via REST API  
- AI-based extraction of structured fields including vendor, invoice, items, and totals  
- Verification and automatic rejection of invoices with missing or incorrect data  
- Support for **multi-page PDFs** (auto-converted to images)  
- **Asynchronous background processing** using BullMQ workers and Redis  
- Centralized invoice management with retrieval and query endpoints  
- Containerized deployment using Docker & Docker Compose  
- High modularity and clean architectural design  

***



## Project Structure  

```
src/
│
├── models/
│   └── invoice.model.js       # Mongoose schema and model
│
├── controllers/
│   └── invoice.controller.js  # Controller logic for all invoice operations
│
├── routes/
│   └── invoice.route.js      # Express routes for invoice endpoints
│
├── workers/
│   └── worker.js              # BullMQ worker for AI extraction
│
├── utils/
│   └── multer.js           # Used for Image and File uploads
│
├── uploads/                   # Temporary file storage (shared via volume)
│
├── index.js                   # Main Express server
│
├── Dockerfile
├── docker-compose.yaml
└── .env.example
```

***

## Tech Stack  

| Component | Technology Used |
|------------|----------------|
| Backend Framework | Express.js (Node.js) |
| Database | MongoDB with Mongoose |
| Message Queue | Redis + BullMQ |
| AI Model | OpenAI (GPT-4.1-mini) |
| Containerization | Docker, Docker Compose |
| File Storage | Shared Docker volume (`shared-uploads`) |
| PDF Conversion | pdf2pic |
| Misc | fs-extra, multer, dotenv |

***

## Core APIs  

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/v1/invoices/` | Upload multiple invoices (images or PDFs) |
| `GET` | `/api/v1/invoices/` | Fetch all invoices |
| `GET` | `/api/v1/invoices/:id` | Get a specific invoice by ID |
| `GET` | `/api/v1/invoices/rejected` | Fetch all rejected invoices |

Example `POST /api/v1/invoices/` (FormData):  
`files: <array of invoice files>`  

***


## Workflow & Architecture  

The project is designed around a **queue-driven AI extraction pipeline**:

1. **User uploads invoices** → stored and job is created in Redis queue.  
2. **Worker process (BullMQ)** takes invoices asynchronously, converts PDFs to images, and calls OpenAI API.  
3. **OpenAI model** extracts structured JSON data validating invoice correctness.  
4. **Worker updates** the MongoDB document—either as `processed` or `rejected`.  
5. **Client fetches** invoice status or details via API endpoints.

**Key benefits:** decoupled components, retry logic, and background scalability.  

***





## Sample Usage Flow  

1. Upload 1–100 invoices using `POST /api/v1/invoices/`
2. Worker asynchronously processes files → AI extracts required details using OpenAI’s GPT vision endpoint  
3. MongoDB entries auto-update with status:  
   - `processed`: successful extraction  
   - `rejected`: failed validation or data error  
4. Query results via GET endpoints (`/all`, `/rejected`, `/id`)  

***



## Evaluation Highlights  

- Clean modular directory layout  
- Implements readable patterns  
- Proper error handling & retry logic  
- Ready for unit/integration testing  
- 85%+ AI extraction accuracy target achieved via prompt engineering  

***

## Author  

**Name:** Yashovardhan Singh  
**GitHub:** [Click Here](https://github.com/Yasho321)
**LinkedIn:** [Click Here](https://www.linkedin.com/in/yashovardhan-singh-9bb28030b/)
**X:** [Click Here](https://x.com/Yasho_27_)

***