def get_credential(credentialName) {
    def v;
    withCredentials([string(credentialsId: credentialName, variable: "someVarName")]) {
        v = env.someVarName;
    }
    return v
}

def get_additional_build_args() {
    return "--build-arg NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT=" + get_credential("NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT") + " --build-arg GMAPS_API_KEY=" + get_credential("GMAPS_API_KEY")
}

pipeline {
    agent {
        dockerfile {
            additionalBuildArgs get_additional_build_args()
            label 'docker-agent-1'
        }
    }
    stages {
        stage("Environment") {
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
            emailext body: 'test jenkins email body', recipientProviders: [buildUser()], subject: 'test jenkins email subject'
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