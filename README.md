# Gap Buster

> **Project created during the TUM.ai Makeathon 2023 at the Technical University of Munich.**
> *Built from the ground up in 48 hours.*

Gap Buster is a web application designed to bridge communication gaps during student dorm renovations by translating and summarizing information from various media formats into concise reports.

## 💡 Inspiration

We recognized some problems during the renovation of our student dorm due to issues in communication. These misunderstandings often led to inefficiencies and frustration, sparking the idea for a tool that could centralize and clarify information.

## 🚀 What it does

Gap Buster provides an easy way of translating and summarizing information from different media sources—such as **photos, text, and audio files**—into a single **PDF file report**. 

Whether it's a photo of a notice board, a voice memo from a facility manager, or a text update, the application processes the input and generates a unified document.

## 🛠️ How we built it

We divided our project into two main parts:

### Frontend
Built with **Vue.js** and **TypeScript**. We utilized:
- **Vuetify** for UI components.
- **Firebase Authentication** for secure user login and registration.
- **Vuex** for state management.
- **Vue Router** for navigation.

### Backend
Built with **Node.js** and **Express.js**. The backend is the core of our processing pipeline, leveraging:
- **Microsoft Azure AI Services**:
  - `azure/ai-form-recognizer` & `azure/ai-language-text` for text analysis.
  - `microsoft-cognitiveservices-speech-sdk` for speech-to-text.
- **Firebase Firestore**: For database management.
- **PDFKit**: To generate the final downloadable reports.
- **Multer**: For handling file uploads.

## 💻 Getting Started

To run this project locally, you will need Node.js installed.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run server
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run serve
   ```

## 🚧 Challenges we ran into

Learning a new API is not always as easy as one might think. We also had a hard time connecting all of our different services together, especially integrating the Azure AI services with our Node.js backend and ensuring smooth data flow to the frontend.

## 🏆 Accomplishments that we're proud of

We're proud to have built a whole functioning application from the ground up in the span of **48 hours**. Seeing the different components—upload, processing, and PDF generation—finally work together was a major milestone.

## 🧠 What we learned

We learned how to use different software technologies, combine them into a single software stack, and organize our workflow around it. It was a great exercise in full-stack development and integrating third-party AI services.

## 🔮 What's next for Gap Buster

We want to expand on our application and implement new features, such as:

- **Chatbot Integration**: A chatbot that can answer questions concerning the projects/renovations.
- **Multilingual Support**: Making the application interface and reports fully multilingual.
- **Role-Based Access**: Assigning different roles to users, such as project organizer, employee, resident, etc.

