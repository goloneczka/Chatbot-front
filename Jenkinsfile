pipeline {
    agent any
    environment {
        DEPLOY_BRANCH = 'deploy'
    }
    stages {
        stage('Build') {
            steps {
                sh '''#!/bin/bash
                pwd
                ls
                '''
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}