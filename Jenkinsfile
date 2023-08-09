pipeline {
    agent any
    environment {
        FRONT_END_SERVER = 'http://13.43.55.166:'
        FRONT_END_PORT = '3000'
    }

    stages{
        stage('Checkout'){
            steps{
                git branch: 'feature/map-view', url: 'https://github.com/veron-eng/GetYourWay.com.git'
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
        stage('Build the app') {
            steps {
                script {
                    def buildCommand = "npm run build " +
                                      "--env=REACT_APP_FIREBASE_API_KEY=${env.NEXT_PUBLIC_FIREBASE_API_KEY} " +
                                      "--env=REACT_APP_FIREBASE_AUTH_DOMAIN=${env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN} " +
                                      "--env=REACT_APP_FIREBASE_PROJECT_ID=${env.NEXT_PUBLIC_FIREBASE_PROJECT_ID} " +
                                      "--env=REACT_APP_FIREBASE_STORAGE_BUCKET=${env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET} " +
                                      "--env=REACT_APP_FIREBASE_MESSAGING_SENDER_ID=${env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID} " +
                                      "--env=REACT_APP_FIREBASE_APP_ID=${env.NEXT_PUBLIC_FIREBASE_APP_ID}"
                    sh "cd frontend && ${buildCommand}"
                }
            }
        }
        stage('Deploy') {
            steps {
                 sh '''
             cd frontend
            npm start
        '''
            }
        }
    }
}