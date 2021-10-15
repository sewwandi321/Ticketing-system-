const app = require("./app")
const PORT=process.env.PORT || 8065

app.listen(PORT,()=>{
    console.log('server running')
})


