pipeline {
    agent any

    tools {nodejs "npm"}

    environment {
          DOCKER_IMAGE_NAME = 'mamotec/energycontrol-frontend'
    }

    stages {

        stage('Setup parameters') {
            steps {
                script {
                    properties([
                        parameters([
                            string(
                                defaultValue: 'latest',
                                name: 'dockerTag',
                                trim: true
                            )
                        ])
                    ])
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Hallo"
                echo "Building configuration: ${params.dockerTag}"
                echo "Building configuration: " + params.dockerTag
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }


        stage('Docker: Build') {
            steps {
              sh "docker build -f ./docker/Dockerfile -t ${DOCKER_IMAGE_NAME}:${docker-tag} --no-cache ."
            }
        }

       stage('Docker: Push') {
              steps {
                sh "docker login -u mamotec -p MaMoTec00001!"

                sh "docker push ${DOCKER_IMAGE_NAME}:${docker-tag}"
              }
          }

       stage('Docker: Delete Image') {
              steps {
                sh "docker image rm ${DOCKER_IMAGE_NAME}:${docker-tag}"
              }
       }
    }
}
