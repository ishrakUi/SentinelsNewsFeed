const db = require('../util/db')

class Post{

    static getPost(cb){
        try {
            db.execute("select post.id, post.title, post.body, post.image, post.vote, post.isPublic, post.sharePost, post.sharepost_id, post.created_at, users.id as user_id, users.first_name, users.last_name, users.email, users.profile_pic  from post inner join users on post.user_id=users.id order by post.created_at Desc").then(
                (result)=>{
                cb(result[0])
                }
            )
        } catch (e) {
            
        }
    }

    static createPost(cb, post, fileName){
        try {
            const {user_id,title, body, isPublic} = post
            db.execute("insert into post (user_id,title, body, image, isPublic) values (?,?,?,?,?)",[user_id,title, body, fileName, isPublic]).then(()=>{
            cb("Post Created")
            })
        } catch (e) {
            console.log(e)
        }
    }

    static editPost(cb, id, post){
        try {
            const {title, body, image, isPublic} = post
            db.execute("update post set title=?, body=?, image=?, isPublic=? where id=?",[title, body, image, isPublic, id]).then(()=>{
            cb("post updated")
            })
        } catch (e) {
            console.log(e)
        }
    }

    static upVote(cb,data){
        try {
            const {user_id, post_id}=data
              db.execute("update post set vote=vote+1 where id=?",[post_id]).then(()=>{
    
                db.execute("select id from vote where user_id=? and post_id=?", [user_id,post_id]).then((result)=>{
                   const resultData= JSON.parse(JSON.stringify(result[0]));
                    if(resultData.length>0){
                        const id=resultData[0].id
                        db.execute("update vote set upvote=1, downvote=0  where id=?",[id]).then(()=>{
                            cb({success: "post upvoted"})
                        })
                    }
                    else{
                        db.execute("insert into vote (user_id, post_id, upvote, downvote) values (?,?,?,?)", [user_id, post_id, 1, 0]).then(()=>{
                            
                            cb({success: "post upvoted"})
                            
                        })
                    }
                    
                })
            })
                
            }  catch (e) {
                console.log(e)
            }
        }
    

    static downVote(cb, data){
        try {
        const {user_id, post_id}=data
          db.execute("update post set vote=vote-1 where id=?",[post_id]).then(()=>{

            db.execute("select id from vote where user_id=? and post_id=?", [user_id,post_id]).then((result)=>{
               const resultData= JSON.parse(JSON.stringify(result[0]));
                if(resultData.length>0){
                    const id=resultData[0].id
                    db.execute("update vote set upvote=0,downvote=1 where id=?",[id]).then(()=>{
                        cb({success: "post downvoted"})
                    })
                }
                else{
                    db.execute("insert into vote (user_id, post_id, upvote, downvote) values (?,?,?,?)", [user_id, post_id, 0, 1]).then(()=>{
                        
                        cb({success: "post downvoted"})
                        
                    })
                }
                
            })
        })
            
        }  catch (e) {
            console.log(e)
        }
        
    }

    static checkVote(cb,id,post_id){
        try {
            db.execute("select * from vote where user_id=? and post_id=?",[id, post_id]).then((res)=>{
                cb(res[0])
            })
        } catch (e) {
            console.log(e)
        }
    }
    static directSharePost(cb, data){
        try {
            const {user_id, isPublic, sharePost_id} = data
            db.execute("insert into post (user_id, isPublic, sharePost, sharePost_id) values (?,?,?,?)",[user_id, isPublic, 1, sharePost_id]).then(()=>{
                cb("Post shared")
            })

        } catch (e) {
            console.log(e)
        }
    }

    static editSharePost(cb,data){
        try {
            const {user_id, title, body, image, isPublic, sharePost_id} = data
            db.execute("insert into post (user_id,title, body, image, isPublic, sharePost, sharePost_id) values (?,?,?,?,?,?,?)",[user_id, title, body, image, isPublic, 1, sharePost_id]).then(()=>{
                cb("Post shared")
            })

        } catch (e) {
            console.log(e)
        }
    }
    static deletePost(cb, id){
        try {
            db.execute("Delete from post where id=?",[id]).then(()=>{
            cb("post Deleted")
            })
        } catch (e) {
            console.log(e)
        }
    }

    static showSharePost(cb, id){
        try {
            db.execute("select post.title, post.body, post.image, post.isPublic, post.sharePost, post.sharepost_id, post.created_at, users.id, users.first_name, users.last_name, users.email, users.profile_pic  from post inner join users on post.user_id=users.id where post.id=?",[id]).then(
                (result)=>{
                cb(result[0])
                }
            )
        } catch (e) {
            
        }
    }
}

module.exports=Post