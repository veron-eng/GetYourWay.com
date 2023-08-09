pipeline {
    agent any
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
        stage('Build the app'){
            steps{
                sh '''
            cd frontend
            npm run build --env1=$(env.NEXT_PUBLIC_FIREBASE_API_KEY) --env2$(env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) --env3=$(env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) --env4$(env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) --env5=$(env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) --env6$(env.NEXT_PUBLIC_FIREBASE_APP_ID)
        '''
            }
        }
    }
}