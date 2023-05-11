pipeline {
    agent any

    environment {
          DOCKER_IMAGE_NAME = 'mamotec/energycontrol-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
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
              sh "docker build -f ./docker/Dockerfile -t ${DOCKER_IMAGE_NAME}:latest ."
            }
        }

       stage('Docker: Push') {
              steps {
                sh "docker login -u mamotec -p MaMoTec00001!"

                sh "docker push ${DOCKER_IMAGE_NAME}:latest"
              }
          }
    }
}
