pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh '''#!/bin/bash
                npx vue-cli-service build
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
                sh '''#!/bin/bash
                cp dist/* /home/app/www/
                '''
            }
        }
    }
}