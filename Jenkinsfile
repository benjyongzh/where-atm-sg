pipeline {
    agent { dockerfile true }
    // environment {
    //     DB_URL = 'mysql+pymysql://usr:pwd@host:/db'
    //     DISABLE_AUTH = true
    // }
    stages {
        stage("Build") {
            steps {
                echo "Building the app..."
                // sh '''
                //     echo "Database url is: ${DB_URL}"
                //     echo "DISABLE_AUTH is ${DISABLE_AUTH}"
                //     env
                // '''
                sh '''
                    node --version
                    git --version
                    curl --version
                '''
                echo "Running a job with build #: ${env.BUILD_NUMBER} on ${env.JENKINS_URL}"
            }
        }
        stage("Test") {
            steps {
                echo "Testing the app..."
            }
        }
        stage("Deploy") {
            steps {
                echo "Deploying the app..."
            }
        }
    }
    post {
        always {
            echo "This will always run regardless of the completion status"
        }
        success {
            echo "Job success!"
        }
        failure {
            echo "Job failed..."
        }
        // unstable {
        //     echo "This will run if the completion status was 'unstable', usually by test failures"
        // }
        // changed {
        //     echo "This will run if the state of the pipeline has changed"
        //     echo "For example, if the previous run failed but is now successful"
        // }
        fixed {
            echo "Pipeline is now fixed from previous run!"
        }
        cleanup {
            echo "Cleaning the workspace"
            cleanWs()
        }
    }
}