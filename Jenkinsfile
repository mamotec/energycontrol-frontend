pipeline {
    agent any

    tools {nodejs "npm"}

    environment {
          DOCKER_IMAGE_NAME = 'mamotec/energycontrol-frontend'
    }

    stages {


        stage('User Input') {
            steps {
                script {
                    def userInput = input(
                        message: 'Bitte Docker Image Tag eingeben',
                        parameters: [
                            string(defaultValue: '', description: 'Der eingegebene String', name: 'userString')
                        ]
                    )
                    echo "Der eingegebene String ist: ${userInput.userString}"
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
              sh "docker build -f ./docker/Dockerfile -t ${DOCKER_IMAGE_NAME}:${userInput.userString} --no-cache ."
            }
        }

       stage('Docker: Push') {
              steps {
                sh "docker login -u mamotec -p MaMoTec00001!"

                sh "docker push ${DOCKER_IMAGE_NAME}:${userInput.userString}"
              }
          }

       stage('Docker: Delete Image') {
              steps {
                sh "docker image rm ${DOCKER_IMAGE_NAME}:${userInput.userString}"
              }
       }
    }
}
