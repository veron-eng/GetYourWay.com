# Backend for GetYourWay.com

## Local Setup

### 1. Installation

Clone this repo from GitHub.

Open the `GetYourWay.com/backend/` folder in IntelliJ.

Maven should install dependencies automatically.
If not, select Maven (either on the right-hand panel or by right-clicking the backend folder)
and `Download Sources`.

### 2. Environment Variables

Either go to `Run -> Edit Configurations...`, 
or select the dropdown next to the green play button at the top of the IDE
and press `Edit Configurations...`.

Paste the following into the `Environment Variables` field, 
replacing the values with your keys:

```text
GYW_FLIGHT_API_ID=<flight_id>; GYW_FLIGHT_API_SECRET=<flight_secret>; GYW_WEATHER_API_KEY=<weather_key>
```


## Running Locally

Run the main file: `src.main.java.com.example.apiSetup/ApiSetupApplication`.

Tests can be found in the `src.tests` folder.