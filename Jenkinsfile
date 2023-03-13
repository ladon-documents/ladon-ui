pipeline {
  agent {
    label 'master'
  }

  environment {
    NPM_USER_BASE64 = credentials('npm-user-base64')
    NODE_OPTIONS = '--openssl-legacy-provider'
  }

  tools { nodejs "nodejs" }
  
  stages {
    stage('npm i') {
      steps {
        sh 'npm ci'
      }
    }

    stage('npm build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Distribute to ladon') {
      when { branch 'master' }
      steps {
        sh 'npm publish'
      }
    }
  }
  
  post {
    always {
      cleanWs()
    }

    success {
      script {
        if (isMasterBranch()) {
          slackSend(message: "Bundled a new Ladon Frontend for you")
        }
      }
    }

  }
}

private Boolean isMasterBranch() {
  return (env.BRANCH_NAME == 'master') ? true : false
}
