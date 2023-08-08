# Backend for GetYourWay.com

## Local Setup

### 1. Installation

Clone this repo from GitHub.

Open the `GetYourWay.com/backend/` folder in IntelliJ.

Maven should install dependencies automatically.
If not, select Maven (either on the right-hand panel or by right-clicking the backend folder)
and `Download Sources`.

### 2. Environment Variables

Add the following to your `~/.zprofiles` file, replacing the values with your keys:

```text
export GYW_FLIGHT_API_ID=<flight_id>
export GYW_FLIGHT_API_SECRET=<flight_secret>
export GYW_WEATHER_API_KEY=<weather_key>
```

You may need to restart IntelliJ for them to be recognised.


## Running Locally

Run the main file: `src.main.java.com.example.apiSetup/ApiSetupApplication`.

Tests can be found in the `src.tests` folder.
