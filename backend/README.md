# GetYourWay.com Backend Documentation

Welcome to the GetYourWay.com backend documentation. This guide will help you set up your local development environment, configure environment variables, run the backend locally, and troubleshoot common issues.

## Prerequisites

Before you begin, ensure you have the following prerequisites in place:

1. **Git**: Make sure you have Git installed on your system. If not, you can download and install it from [https://git-scm.com/](https://git-scm.com/).

2. **IntelliJ IDEA**: Make sure you have IntelliJ IDEA installed on your system. You can download it from [https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/).

3. **Java 11**: Ensure you have Java 11 installed. You can download it from [https://www.oracle.com/java/technologies/javase-jdk11-downloads.html](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).

## Getting Started

Follow these steps to set up your local development environment and start contributing:

### 1. Clone the Repository

1. Clone this repository from GitHub using the following command:

   ```bash
   git clone https://github.com/GetYourWay/backend.git
   ```

### 2. Create a Branch

1. Change your working directory to the `backend` folder using the terminal in IntelliJ.

2. Create a new branch off the `dev` branch for your task or feature. Use the following naming conventions:
   - Test: `Test/(name of test/task)`
   - Feature: `Feature/(name of feature)`
   - Experimenting: `Using/(description of what you're trying)`

### 3. Installation

1. Open the `GetYourWay.com/backend/` folder in IntelliJ.

2. IntelliJ should automatically install Maven dependencies. If not, select Maven (either on the right-hand panel or by right-clicking the backend folder) and choose `Download Sources`.

### 4. Environment Variables

1. Add the following environment variables to your `~/.zprofiles` file, replacing the values with your actual keys:

   ```plaintext
   export GYW_FLIGHT_API_ID=<flight_id>
   export GYW_FLIGHT_API_SECRET=<flight_secret>
   export GYW_WEATHER_API_KEY=<weather_key>
   ```

   Note: You may need to restart IntelliJ for the variables to be recognized.

2. Alternatively, you can go to `Run -> Edit Configurations...` in IntelliJ and enter the environment variables manually. Make sure to configure these variables for both `GetYourWayApplication` and any test configurations. If you choose this approach, ensure that `.idea` is added to your `.gitignore` file.

## Running Locally

To run the backend locally:

1. Run the main file: `src.main.java.com.example.apiSetup/ApiSetupApplication`.

2. Tests can be found in the `src.tests` folder.

The backend is configured to run on port 8000, which matches the port of the website hosted on the EC2 instance server.

## Troubleshooting

If you encounter any issues:

- **IntelliJ IDEA**: If you face problems with IntelliJ IDEA, refer to the [IntelliJ IDEA documentation](https://www.jetbrains.com/idea/documentation/).

- **Maven Dependencies**: If Maven does not automatically install dependencies, you can manually trigger it by selecting Maven and choosing `Download Sources`.

- **Spring Boot**: If you encounter issues related to Spring Boot, consult the [Spring Boot documentation](https://spring.io/projects/spring-boot).

Thank you for your contributions to the GetYourWay.com backend!

_GetYourWay.com Backend Team_
_Owned by Sky_

```

Please make sure to replace placeholders such as `<flight_id>`, `<flight_secret>`, and `<weather_key>` with actual values as provided.
```
