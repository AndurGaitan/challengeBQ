export const config = {
    server: {
        port: 8080,
        secretSession: "passwordSecret"
    },
    mongo: {
        url:'mongodb+srv://adminEcommerce:2Whn48RR66OEm8gv@cluster0.jwe0tnc.mongodb.net/?retryWrites=true&w=majority'
    },
    github: {
        clientId: 'Iv1.11000486f20342f2',
        clientSecret: '33b0fca8886e17566d9b7202bf2eb1410bb688bc',
        callBackUrl: 'http://localhost:8080/api/sessions/github-callback'
    }
}