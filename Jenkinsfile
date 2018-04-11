node {
    checkout scm
    stage('prepare') {
        sh "yarn install"
    }
    stage('test') {
        sh "yarn test"
    }
    stage('build') {
        sh "REACT_APP_API_URL=51.254.212.96:7001 yarn build"
    }
}