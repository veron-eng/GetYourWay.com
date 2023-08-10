pipeline {
    agent any
    environment {
        FRONT_END_SERVER = 'http://13.43.55.166:'
        FRONT_END_PORT = '3000'
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
        stage('Build the app') {
            steps {
                    sh '''
                        cd frontend
                        npm run build
                    '''
            }
        }
         stage('Deploy') {
            steps {
               sh "npm run start"
                    sh "echo Jenkins Build PORT: 3000"
            }
        }
    }
}