const db = require('../util/db')

class Comment{
    static getComment(cb, post_id){
        try {
            db.execute("select comment.id, comment.body, comment.created_at, users.first_name, users.last_name, users.id, users.email,users.profile_pic  from comment Inner Join users on comment.user_id=users.id where post_id=?",[post_id]).then((result)=>{
                cb(result[0])
            })
        } catch (e) {
            console.log(e)
        }
    }

    static createComment(cb, data){
        try {
            const {body, user_id, post_id}=data
            db.execute("insert into comment (body, user_id, post_id) values (?,?,?)", [body, user_id, post_id]).then(()=>{
                cb("comment added")
            })
        } catch (e) {
            console.log(e)
        }
    }

    static editComment(cb, data){
        try {
            const {body, id}=data
        db.execute("update comment set body=? where id=?", [body, id]).then(()=>{
            cb("comment Updated")
        })
            
        } catch (e) {
            console.log(e)
        }
        
    }
    static deleteComment(cb, id){
        try {
            db.execute("Delete from comment where id=?",[id]).then(()=>{
            cb({success:"comment Deleted"})
            })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports=Comment