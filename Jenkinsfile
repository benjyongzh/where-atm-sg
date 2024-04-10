pipeline {
    environment { 
        NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT=credentials('NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT')
        GMAPS_API_KEY=credentials('GMAPS_API_KEY')
//      DB_URL = 'mysql+pymysql://usr:pwd@host:/db'
//      DISABLE_AUTH = true
    }
    agent {
        dockerfile {
            additionalBuildArgs '--build-arg NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT=$NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT --build-arg GMAPS_API_KEY=$GMAPS_API_KEY'
        }
    }
    stages {
        stage("Enviroment") {
            steps {
                sh '''
                    node --version
                '''
                echo "Running a job with build #: ${env.BUILD_NUMBER} on ${env.JENKINS_URL}"
            }
        }
        stage("Build") {
            steps {
                echo "Building the app..."
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
            sh 'docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi'
        }
    }
}