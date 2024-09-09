pipeline {
    agent any

    environment {
      DOCKER_IMAGE = 'marveloper/nexusflow-cicd-orchestrator:latest'
      KUBE_CONFIG = credentials('kubernetes-config')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test:coverage'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
              script {
                docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
              }
            }
        }

        stage('Push Docker Image') {
            steps {
              script {
                docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                  docker.image("${DOCKER_IMAGE}:${env.BUILD_NUMBER}").push()
                  docker.image("${DOCKER_IMAGE}:latest").push()
                }
              }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
              script {
                sh "kubectl --kubeconfig=${KUBE_CONFIG} set image deployment/nexusflow-cicd-orchestrator nexusflow-cicd-orchestrator=${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
                sh "kubectl --kubeconfig=${KUBE_CONFIG} rollout restart deployment/nexusflow-cicd-orchestrator"
              }
            }
        }
    }

    post {
      always {
        junit 'junit/**/*.xml'
        cobertura coberturaReportFile: 'coverage/cobertura-coverage.xml'
        cleanWs()
      }
    }
}