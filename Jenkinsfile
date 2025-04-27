pipeline {
    agent any
    
    environment {
        // Environment variables
        EMAIL_TO = credentials('EMAIL_TO')
        NODE_ENV = 'production'
    }
    
    stages {
        stage('Setup') {
            steps {
                // Check software availability
                sh 'node --version'
                sh 'npm --version'
                
                // Install dependencies
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building application...'
                // Any build steps if needed
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to Render...'
                // In a real scenario, you would trigger a deploy to Render
            }
        }
    }
}
