pipeline {
    agent any // This means the pipeline can run on any available Jenkins agent

    triggers {
        githubPush() // This will automatically trigger the pipeline on every push to your GitHub repository
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/kimberlynangira/gallery.git' // Replace with the actual URL of your forked repository
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Assuming your project uses Yarn. If it uses npm, change to 'npm install'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh 'curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer rnd_oQvF1IBQ7cEEP6sW23rq440E92rM" -d \'{ "serviceId": "srv-cvqvk415pdvs73e63pm0" }\' https://api.render.com/v1/services/srv-cvqvk415pdvs73e63pm0/deploy'
            }
        }
    }
}
