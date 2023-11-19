const Pool=require("pg").Pool;
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"college",
    password:"qwerty",
    port:5432,

}
);

pool.on("connect",()=>{
    console.log("CONNECTED")
})

pool.on("end",()=>{
    console.log("DISCONNECTED")
})
module.exports=pool;