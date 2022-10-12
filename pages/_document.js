import Document, { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/Navbar'
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Navbar />
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link href="https://fonts.googleapis.com/css2?family=Aboreto&family=Anton&family=Poppins&family=Roboto&display=swap"
            rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </Head>
        
        
          <Main />
          <NextScript />
       
      </Html>
    )
  }
}
export default MyDocument