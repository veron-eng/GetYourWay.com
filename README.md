# GetYourWay.com Codebase Documentation

## Introduction

Welcome to the official documentation for the GetYourWay.com codebase – Find Your Next Adventure. GetYourWay.com is a comprehensive travel platform that offers flight services, interactive map interfaces, and personalized TV recommendations. Owned by Sky, our website is designed to empower users with the tools they need to plan their journeys efficiently.

This documentation provides an overview of the technologies, components, and methodologies that drive the GetYourWay.com website. Whether you're a developer, tester, or authorized user, this guide will help you navigate the codebase and contribute effectively.

## Technology Stack

### Frontend

The frontend of GetYourWay.com is built with a modern stack, ensuring a responsive and engaging user interface:

- **React TSX**: A powerful JavaScript library for building user interfaces with TypeScript support.
- **Next.js**: A framework for server-rendered React applications, providing performance and SEO benefits.
- **Tailwind CSS**: A utility-first CSS framework that streamlines UI development.
- **Google Maps**: Integrated mapping interface for discovering local attractions and activities.
- **Axios**: A popular library for making HTTP requests from the frontend.
- **Google OAuth using Firebase**: Authentication and authorization using Google OAuth, facilitated by Firebase.

### Backend

The backend of GetYourWay.com is a robust foundation for data processing and API integration:

- **Java Spring Boot**: A versatile framework for building enterprise-level applications with Spring ecosystem support.
- **Maven**: A build automation and project management tool for Java projects.
- **WeatherAPI.com**: External API for real-time weather data integration.
- **Amadeus API**: External API for flight data and booking services.
- **top.jfunc.json**: JSON parsing library for efficient data manipulation.

## Deployment and CI/CD

We maintain a streamlined development process for code deployment:

- **Jenkins Pipeline**: Our CI/CD pipeline automates the deployment of the latest code to the main branch. For a visual representation of our deployment process, refer to the [Jenkins Deployment Diagram](jenkins_diagram.png).

- **GitHub Repository**: The codebase resides in a GitHub repository owned by our team.

- **AWS EC2 Instance**: The website is hosted on an AWS EC2 instance under the QA account.

## API Documentation

Explore the API calls and test them using our Swagger UI, integrated into the backend:

- **Swagger UI**: Accessible API documentation for understanding and testing endpoints. For a visual representation of API calls, refer to the [API Call Diagram](api_calls_diagram.png).

## Architecture Diagrams

To better understand the system architecture, refer to the following diagrams:

- **Frontend Architecture Diagram**: [Frontend Architecture](frontend_architecture.png)
- **Backend Architecture Diagram**: [Backend Architecture](backend_architecture.png)

## Agile Methodology

GetYourWay.com follows agile methodologies to foster adaptability and efficiency:

- **Agile Principles**: We prioritize adaptability and customer collaboration, responding to change promptly.

- **Documentation**: Detailed guides in the frontend and backend folders provide instructions for authorized users, testers, and developers.

## Getting Started

Refer to the guides in the frontend and backend folders for comprehensive instructions on usage, testing, and development. This documentation empowers you to understand, contribute, and enhance the GetYourWay.com website effectively.

For any questions or support, please reach out to our team at victoria@qa.com.

Thank you for contributing to our journey!

_GetYourWay.com Team_
_Owned by Sky_

17/08/2023
