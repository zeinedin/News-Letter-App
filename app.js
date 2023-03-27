const express = require("express");
const body = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(body.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const https = require("https")
    const data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
             }   
            ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/5cc58dd8a9"
    const options = {
        method:"POST",
        auth: "zzets:e54cb75bfde3f213fbcb5ba40ea2ed9c-us17",
        body: data
    }
    
    
    const request = https.request(url, options, (response) => {

                let data = '';
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            const result = JSON.parse(data);
            res.send(result);
            
        if(response.error_count === 0){
            res.sendFile(__dirname +"/succes.html")
        }else{
            res.sendFile(__dirname +"/failure.html")
        }
        });

        });
      
      request.write(jsonData);
      request.end();

});


app.listen(process.env.PORT, ()=>{
    console.log("server is runing");
});
