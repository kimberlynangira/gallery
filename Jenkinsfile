pipeline {
 agent any
 environment {
   RENDER_DEPLOY_HOOK = credentials('RENDER_DEPLOY_HOOK')
   SLACK_CHANNEL = "#kimberly_IP1"
   EMAIL_TO = credentials('EMAIL_TO')
   NODE_ENV = 'production'
 }
 triggers {
   githubPush() // Automatically trigger on push to repository
 }
 stages {
   stage('Clone Repository') {
     steps {
       // Clean workspace before cloning
       cleanWs()
       
       // Clone the repository
       git url: 'https://github.com/kimberlynangira/gallery.git', branch: 'master'
       
       echo "Successfully cloned the repository"
     }
   }
   
   stage('Check Software Availability') {
     steps {
       sh 'node --version'
       sh 'npm --version'
     }
   }
   
   stage('Install Dependencies') {
     steps {
       sh 'npm install'
     }
   }
   
   stage('Run Tests') {
     steps {
       script {
         try {
           sh 'npm test'
         } catch (Exception e) {
           emailext (
             subject: "Test Failure: ${currentBuild.fullDisplayName}",
             body: "The tests failed in ${env.JOB_NAME} build #${env.BUILD_NUMBER}.\n\nCheck console output at ${env.BUILD_URL}",
             to: "${env.EMAIL_TO}"
           )
           throw e
         }
       }
     }
   }
   
   stage('Deploy to Render') {
     steps {
       sh "curl ${RENDER_DEPLOY_HOOK}"
     }
   }
 }
 post {
   success {
     slackSend channel: "${SLACK_CHANNEL}",
     color: 'good',
     message: "Deployment Successful! Build ID: ${env.BUILD_NUMBER}. View the site at: https://gallery-app.onrender.com"
   }
   failure {
     slackSend channel: "${SLACK_CHANNEL}",
     color: 'danger',
     message: "Build Failed! Build ID: ${env.BUILD_NUMBER}"
   }
 }
}