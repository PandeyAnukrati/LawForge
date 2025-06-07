# LawForge: AI-Powered Legal Document Analyzer and Generator

LawForge is an advanced AI-powered web application designed to streamline the analysis, management, and generation of legal documents. Leveraging cutting-edge AI, it provides a comprehensive solution for legal professionals to efficiently handle their documentation needs.

## ✨ Features

* **Authentication:** Secure user authentication using Email/Password.
* **Document Uploads:** Supports various document formats including PDF, DOCX, and TXT.
* **AI-Powered Analysis:** Utilizes the Google Gemini API for intelligent document analysis.
* **Detailed Document Reports:** Generates insightful reports on key aspects such as parties involved, critical clauses, important dates, and more.
* **History Tracking:** Maintains a comprehensive history of analyzed and generated documents for easy reference.
* **User Profile Management:** Allows users to manage their profiles and settings.
* **Stunning User Interface:** Built with a modern and intuitive design using Shadcn UI, Tailwind CSS, and Framer Motion for a seamless user experience.

## 🚀 Technologies Used

LawForge is built with a robust and modern tech stack:

* **Frontend:**
    * [React](https://react.dev/)
    * [Next.js](https://nextjs.org/)
    * [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:**
    * [Shadcn UI](https://ui.shadcn.com/)
    * [Lucide Icons](https://lucide.dev/)
    * [Framer Motion](https://www.framer.com/motion/)
* **Backend:**
    * Node.js + Express
    * *Alternatively:* Firebase Functions
* **Database:**
    * [MongoDB](https://www.mongodb.com/)
* **Authentication:**
    * JWT (JSON Web Tokens)
* **File Handling:**
    * [Multer](https://www.npmjs.com/package/multer)
* **AI Model:**
    * [Google Gemini API](https://ai.google.dev/models/gemini)

## 🛠️ Installation

To set up LawForge locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/PandeyAnukrati/LawForge.git](https://github.com/PandeyAnukrati/LawForge.git)
    cd LawForge
    ```
2.  **Install dependencies:**
    ```bash
    # For the frontend
    cd frontend-directory-name # Replace with your actual frontend directory name
    npm install
    # For the backend
    cd ../backend-directory-name # Replace with your actual backend directory name
    npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in your backend directory and add the necessary environment variables, such as your MongoDB connection URI and Google Gemini API key.
    ```
    MONGODB_URI=your_mongodb_connection_string
    GEMINI_API_KEY=your_gemini_api_key
    JWT_SECRET=your_jwt_secret
    # Add any other necessary environment variables
    ```
4.  **Run the application:**
    ```bash
    # Start the frontend
    cd frontend-directory-name
    npm run dev
    # Start the backend
    cd ../backend-directory-name
    npm start
    ```

*Please note: The specific directory names (`frontend-directory-name`, `backend-directory-name`) might vary based on your project structure. Adjust the `cd` commands accordingly.*

## 🚀 Usage

Once the application is running, you can:

* Register or log in to your account.
* Upload legal documents (PDF, DOCX, TXT) for analysis.
* View detailed AI-generated reports on your documents.
* Track your document history and manage your user profile.

---

