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
                sh 'cd frontend'
                sh 'npm install'
            }
        }
        stage('Build the app'){
            steps{
                sh 'npm run build'
            }
        }
    }
}