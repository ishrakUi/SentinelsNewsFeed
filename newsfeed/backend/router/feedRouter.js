const express=require('express')

const router=express.Router()

const user=require('../model/User')

const post=require('../model/Post')

const comment=require('../model/Comment')

const save=require('../model/Save')
const multer =require('multer')
const session = require('express-session')
const path=require('path')

const Upload_folder="../newsfeed/public/images"

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, Upload_folder);
    },
    filename:(req,file,cb)=>{
        const fileExt=path.extname(file.originalname);
        const filename=file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("-")+"-"+Date.now();
        cb(null, filename+fileExt);
    }
});
const upload=multer({
    storage:storage,
    limts:{
        fileSize:2000000,

    },
    fileFilter:(req, file, cb)=>{
        if(
            file.mimetype==="image/png"||
            file.mimetype==="image/jpg"||
            file.mimetype==="image/jpeg"

        ){
            cb(null, true);
        }else{
            cb(new Error("Only jpeg jpg and png allowed"))
        }
    }
})

const isAuthenticated=(req,res,next)=>{
    const token=req.body.token;
    if(token=="reguser"){
        next();
    }
    else{
        res.json({
            error:"not registered"
        })
    }
    
}


router.get("/users", async(req, res,next)=>{
   user.getUsers((result)=>{
    res.json(result)
   })
})


router.get("/user/:id", async(req, res,next)=>{
    
    user.getUser((result)=>{
     res.json(result)
    }, req.params.id)
 })

router.post("/register/user", (req,res,next)=>{
    
    const data=req.body
    user.registerUser((result)=>{
        res.json(result)
    },data)
})

router.post("/edit/user/:id", upload.single('image'), isAuthenticated, (req,res,next)=>{
    
    const fileName=req.file.filename;
    const data=req.body
    user.editUser((result)=>{
        
        res.json(result)
    },req.params.id, data, fileName)
})


router.post("/verify", (req,res,next)=>{
    user.verifyLogin((result)=>{
        res.json(result)
    },req)
})



router.delete("/delete/user/:id",isAuthenticated, (req,res,next)=>{
    
    user.deleteUser((result)=>{
        res.json(result)
    },req.params.id)
})

router.get("/feeds", async(req, res,next)=>{
    post.getPost((result)=>{
     res.json(result)
    })
 })

 router.post("/create/post", upload.single('image'), isAuthenticated, async (req,res,next)=>{
    const fileName=req.file.filename;
    const data=req.body
    post.createPost((result)=>{
        res.json(result)
    },data,fileName)
})

router.post("/edit/post/:id",isAuthenticated, (req,res,next)=>{
    
    const data=req.body
    post.editPost((result)=>{
        res.json(result)
    },req.params.id, data)
})

router.post("/post/upvote/",isAuthenticated, (req,res,next)=>{
    const data=req.body
    post.upVote((result)=>{
        res.json(result)
    },data)

})

router.post("/post/downvote/",isAuthenticated, (req,res,next)=>{
    const data=req.body
    post.downVote((result)=>{
        res.json(result)
    },data)

})
router.get("/post/getvotes/:id/:post", (req,res,next)=>{
    post.checkVote((result)=>{
        res.json(result)
    },req.params.id,req.params.post)
})

router.post("/post/directShare/",isAuthenticated, (req,res,next)=>{
    const data=req.body
    post.directSharePost((result)=>{
        res.json(result)
    },data)
})

router.post("/post/editShare/",isAuthenticated, (req,res,next)=>{
    const data=req.body
    post.editSharePost((result)=>{
        res.json(result)
    },data)
})


router.delete("/post/delete/:id", isAuthenticated, (req,res,next)=>{
    
    post.deletePost((result)=>{
        res.json(result)
    },req.params.id)
})

router.get('/post/sharepost/:id', (req,res,next)=>{
    post.showSharePost((result)=>{
     res.json(result)   
    },req.params.id)
})
router.get('/post/getComment/:id', (req,res,next)=>{

    comment.getComment((result)=>{
        res.json(result)
    }, req.params.id)
})

router.post('/post/comment/', isAuthenticated, (req,res,next)=>{
    const data=req.body
    comment.createComment((result)=>{
        res.json(result)
    }, data)
})

router.post('/post/comment/edit', isAuthenticated, (req,res,next)=>{
    const data=req.body
    comment.editComment((result)=>{
        res.json(result)
    },data)
})

router.delete('/post/comment/delete/:id', isAuthenticated, (req,res,next)=>{
    comment.deleteComment((result)=>{
        res.json(result)
    }, req.params.id)
})

router.post('/post/save', isAuthenticated, (req,res,next)=>{
    const data=req.body
    save.savePost((result)=>{
        res.json(result)
    },data)
})

router.get('/post/saved/:id',(req,res,next)=>{
    save.getSavedPost((result)=>{
        res.json(result)
    }, req.params.id)
})

router.delete('/post/saved/delete/:id', isAuthenticated, (req,res,next)=>{
    save.removeSavedPost((result)=>{
        res.json(result)
    }, req.params.id)
})

module.exports=router