const db =require('../util/db')
const bcrypt=require('bcrypt')
const saltRounds=10
class User{

    static verifyLogin(cb,req){
        try {
            const email=req.body.email;
            const password=req.body.password;
            db.execute("select * from users where email=?",[email]).then(
                (result)=>{
                    if(result[0].length>0){
                        const data=JSON.parse(JSON.stringify(result[0]));
                        bcrypt.compare(password, data[0].password, (err, response)=>{
                            if(response){
                               
                               
                                cb(result[0]) 
                            }
                            else{
                                cb({error: "invalid Credentials"})
                            }
                        })
                    }
                    else{
                        cb({error: "user does not exist"})  
                    }
                    
                }
            )
        } catch (e) {
            console.log(e)
        }
    }


    static getUsers(cb){
        try {
            db.execute("select first_name, last_name, email, profile_pic, about, dob, created_at from users").then(
                (result)=>{
                cb(result[0])
                }
            )
        } catch (e) {
            
        }
    }

    static getUser(cb, id){
        try {
            db.execute("select * from users Where id= ?",[id]).then(
                (result)=>{
                cb(result[0])
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    static registerUser(cb, user){
        try {
            const {first_name, last_name, email, password, dob} = user
            bcrypt.hash(password, saltRounds, (err, hash)=>{
                if(err){
                    console.log(err)
                }
                db.execute("insert into users (first_name, last_name, email, password,  dob) values (?,?,?,?,?)",[first_name, last_name, email, hash, dob]).then((res)=>{
                    db.execute("select id,first_name, last_name, email, profile_pic, about, dob, created_at from users where email=?",[email]).then((result)=>{
                        cb({success:"Acount Registered", result:result[0], res:res})
                    })
                })

            })
           
        } catch (e) {
            console.log(e)
        }
    }

    static editUser(cb, id, user, fileName){
        try {
            const {first_name, last_name, email, about} = user
            db.execute("update users set first_name=?, last_name=?, email=?, profile_pic=?, about=? where id=?",[first_name, last_name, email, fileName, about, id]).then(()=>{
            cb({success:"Acount updated"})
            })
        } catch (e) {
            console.log(e)
        }
    }

    static deleteUser(cb, id){
        try {
            db.execute("Delete from users where id=?",[id]).then(()=>{
            cb({success:"Account Deleted"})
            })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports=User