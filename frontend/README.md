# GetYourWay.com Frontend Documentation

Welcome to the GetYourWay.com frontend documentation. This guide will help you get started with setting up your development environment, making contributions, and troubleshooting common issues.

## Prerequisites

Before you begin, ensure you have the following prerequisites in place:

1. **Git**: Make sure you have Git installed on your system. If not, you can download and install it from [https://git-scm.com/](https://git-scm.com/).

2. **Node.js**: You'll need Node.js installed on your machine. We recommend using version 18.16.1. You can download it from [https://nodejs.org/](https://nodejs.org/).

3. **Visual Studio Code**: We recommend using Visual Studio Code as your code editor. You can download it from [https://code.visualstudio.com/](https://code.visualstudio.com/).

4. **Google Chrome**: We recommend using Google Chrome for testing and debugging. You can download it from [https://www.google.com/chrome/](https://www.google.com/chrome/).

## Getting Started

Follow these steps to set up your development environment and start contributing:

1. **Clone the Repository**: Clone the provided repository to your local machine using the following command:

   ```bash
   git clone https://github.com/GetYourWay/frontend.git
   ```

2. **Create a Branch**: Create a new branch off the `dev` branch for your task or feature. Use the following naming conventions:

   - Test: `Test/(name of test/task)`
   - Feature: `Feature/(name of feature)`
   - Experimenting: `Using/(description of what you're trying)`

3. **Install Packages**: Change your working directory to the `frontend` folder using the terminal in Visual Studio Code. Run the following command to install the required packages:

   ```bash
   cd frontend
   npm install
   ```

4. **Update Environment Variables**: In the `frontend` folder, locate the `.env.local` file and update the keys with the provided values. Your `.env.local` file should look like this:

   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
   NEXT_PUBLIC_AIRLABS_API_KEY=your_airlabs_api_key_here
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

   Replace the placeholders with the actual keys provided to you.

## Development and Testing

To start the development server, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can edit the page by modifying `app/page.tsx`, and the page will auto-update as you make changes.

For a deeper understanding of the frontend architecture and component interactions, refer to the [Frontend Architecture Diagram](frontend_architecture.png).

## Troubleshooting

If you encounter any issues:

- **Changing Port**: To run the server on a different port, add the `--port` flag followed by the desired port number to the `npm run dev` command.

- **Keys or GitHub Privileges**: If you're facing issues with keys or GitHub privileges, please reach out to our support team for assistance.

- **VS Code or Git/GitHub Issues**: If you're experiencing problems with Visual Studio Code, Git, GitHub, or browser compatibility, refer to our support resources or reach out to our team for help.

- **Backend Issues**: For any backend-related problems, you can either refer to the backend documentation or contact our support team.

Thank you for your contributions to GetYourWay.com!

_GetYourWay.com Frontend Team_
_Owned by Sky_
