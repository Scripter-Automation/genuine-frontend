const prod_base_url = "https://account.docusign.com/oauth/auth?"
const dev_base_url = "https://account-d.docusign.com/oauth/auth?"
export const environment = {
    production: false,
    firebaseConfig : {
        apiKey: "AIzaSyBuT0N-uOlHyC16IYP5fivpeOqzJPYHiRk",
        authDomain: "genuine-app-30ebe.firebaseapp.com",
        projectId: "genuine-app-30ebe",
        storageBucket: "genuine-app-30ebe.appspot.com",
        messagingSenderId: "395655928259",
        appId: "1:395655928259:web:dc9d2911c5ac01ede90576",
        measurementId: "G-BZQ4000CL9"
      },
    docusignConfig:{
      integrationKey:"a3a58b3c-bfc2-4271-9c8d-8f8c69e094d3",
      authSecret:"6029d7a0-8039-404e-a156-90389bb694cb",
      redirectURI:"http://localhost:4200/Contratos"
    },
    Docusing_Auth_URL:"",
    Back_end:{
      url:"http://localhost:3000/",
      paths:{
        access_token:"docusign/access_token",
        create_session:"session/create"
      }
    }

    
}


environment.Docusing_Auth_URL = `${dev_base_url}
   response_type=code
   &scope=signature
   &client_id=${environment.docusignConfig.integrationKey}
   &redirect_uri=${environment.docusignConfig.redirectURI}
   
`

