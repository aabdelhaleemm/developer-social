const express = require('express');
require('./db/db');
const app = express()


//middleware
app.use(express.json())

//Routers
app.use('/api/users',require('./routers/users'))
app.use('/api/profiles',require('./routers/profiles'))
app.use('/api/posts',require('./routers/posts'))


const port= process.env.PORT || 5000
app.listen(port,()=>{
    console.log('server is running ',port);
})
