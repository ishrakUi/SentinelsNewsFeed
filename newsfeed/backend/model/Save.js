const db=require('../util/db')

class Save{
    
    static savePost(cb, data){
        try {
            const {user_id, post_id}=data
            db.execute("insert into saved (user_id, post_id) values (?,?)",[user_id, post_id]).then(()=>{
                cb({success:"post saved"})
            })
        } catch (e) {
            console.log(e)
        }
    }

    static getSavedPost(cb, id){
        try {
            db.execute("select post.title, post.body, post.image, post.isPublic, post.sharePost, post.sharepost_id, post.created_at, users.id, users.first_name, users.last_name, users.email, users.profile_pic from saved inner join users on users.id=saved.user_id inner join post on post.id=saved.post_id where saved.user_id=? order by post.created_at Desc",[id]).then((result)=>{
                cb(result[0])
            })
            
        } catch (e) {
            console.log(e)
        }
    }

    static removeSavedPost(cb,id){
        try {
            db.execute("Delete from saved where id=?",[id]).then(()=>{
            cb({success:"saved post removed"})
            })
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports=Save