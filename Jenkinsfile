pipeline {
    agent none

    stages {
        stage('Build') {
            steps {
                bash '''#!/bin/bash
                cd /home/app/www
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