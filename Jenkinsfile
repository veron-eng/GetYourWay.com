pipeline {
    agent any
    environment {
        FRONT_END_SERVER = 'http://13.43.55.166:'
        FRONT_END_PORT = '3000'
        YW_FLIGHT_API_ID=uA9SdKENutAxwbX9psZOJotjPtbxYm2I
        GYW_FLIGHT_API_SECRET=Xo9GMBOAkytZcLJz
        GYW_WEATHER_API_KEY=ffa238a384a44140a0d160010230908
        GOOGLE_MAPS_API_KEY=AIzaSyBQ-7FRus3W2IvCX1Fr3Eis77q0CdL-pOs
        WEATHER_STACK_API_KEY=c710603f5a77c61ba8fcbaa07baa1fe5
    }

    stages{
        stage('Checkout'){
            steps{
                git branch: 'main', url: 'https://github.com/veron-eng/GetYourWay.com.git'
            }
        }
        stage('Install dependencies'){
            steps{
                sh '''
            cd frontend
            npm install
        '''
            }
        }
        stage('Test the app') {
            steps {
                sh '''
                    cd frontend
                    npm test
                '''
            }
        }
        stage('Build the app') {
            steps {
                    sh '''
                        cd frontend
                        npm run build
                    '''
            }
        }
    }
}