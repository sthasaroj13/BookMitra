import app from './src/app'
import { config } from './src/config/config';
import connectDb from './src/config/db';



const startSever = async () => {
    //connect database
    await connectDb()


    const port = config.port || 5000
    app.listen(port, () => {
        console.log(`Listing on port :${port}`);


    })
}
startSever()


// console.log('welcome to ebook api');


// function test() {
//     console.log('hello ');

// }