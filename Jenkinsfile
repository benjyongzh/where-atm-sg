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
    // agent any
    agent {
        // docker {
        //     image 'node:lts-alpine3.19'
        // }
        label "docker-agent-1"
    }
    environment {
        REPO="benjyongzh/where-atm-sg"
        TAG="1.0.4"
    }
    stages {
        stage("Environment") {
            steps {
                echo "Running a job as build #: ${BUILD_NUMBER} on ${NODE_NAME} agent"
                sh 'which docker'
                sh 'docker version'
            }
        }
        stage("Build") {
            // agent {
            //     dockerfile {
            //         additionalBuildArgs get_additional_build_args()
            //     }
            //     docker {
            //         image 'node:lts-alpine3.19'
            //         reuseNode true
            //     }
            // }
            steps {
                echo "Building the app on ${NODE_NAME} agent..."
                sh "docker build " + get_additional_build_args() + " -t ${REPO}:${TAG} ."\
            }
        }
        stage("Test") {
            steps {
                echo "Testing the app on ${NODE_NAME} agent..."
            }
        }
        stage("Deploy") {
            steps {
                echo "Deploying the app on ${NODE_NAME} agent..."
            }
        }
    }
    
    post {
        // always {
        //     echo "This will always run regardless of the completion status"
        //     emailext body: 'test jenkins email body', recipientProviders: [buildUser()], subject: 'test jenkins email subject'
        // }
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
        // fixed {
        //     echo "Pipeline is now fixed from previous run!"
        // }
        cleanup {
            echo "Cleaning the workspace..."
            sh 'docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi'
            cleanWs()
        }
    }
}