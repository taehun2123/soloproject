const sql = require('./db.js');

// 생성자
const Post = function(post){
  this.title = post.title;
  this.content = post.content;
  this.date = post.date;
  this.log = post.log;
};

// post 튜플 추가 (C)

Post.create = (newPost, result)=>{
  sql.query("INSERT INTO posts SET ?", newPost, (err, res)=>{
      if(err){
          console.log("에러 발생: ", err);
          result(err, null);
          return;
      }
      console.log("새 게시글이 생성되었습니다: ",{id: res.insertId, ...newPost });
      result(null, {id: res.insertId, ...newPost});
  });
};

  // Post id로 조회
  Post.findByID = (postID, result)=>{
    sql.query('SELECT * FROM posts WHERE id = ?',postID, (err, res)=>{
        if(err){
            console.log("에러 발생: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("다음 게시글을 찾았습니다: ", res[0]);
            result(null, res[0]);
            return;
        }
        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    });
  };

  // post 전체 조회
  Post.getAll = result =>{
    sql.query('SELECT * FROM posts', (err, res)=>{
        if(err){
            console.log("에러 발생: ", err);
            result(err, null);
            return;
        }
        console.log("생성된 모든 게시글: ", res);
        result(null, res);
    });
  };

  // post id로 수정
  Post.updateByID = (id, post, result)=>{
    sql.query('UPDATE posts SET ? WHERE id = ?', [post, id], (err, res)=>{
        if(err){
            console.log("에러 발생: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }
        console.log("게시글을 수정하였습니다: ", {id:id, ...post});
        result(null, {id:id, ...post});
    });
  };

  // user id로 삭제
Post.remove = (id, result)=>{
  sql.query('DELETE FROM posts WHERE id = ?',id, (err, res)=>{
      if(err){
          console.log("error: ", err);
          result(err, null);
          return;
      }
      if(res.affectedRows ==0){
          // id 결과가 없을 시 
          result({kind: "not_found"}, null);
          return;
      }
      console.log("해당 ID의 게시글이 정상적으로 삭제되었습니다: ", id);
      result(null, res);
  });
};

// user 전체 삭제
Post.removeAll = result =>{
  sql.query('DELETE FROM posts',(err, res)=>{
      if(err){
          console.log("error: ", err);
          result(err, null);
          return;
      }
      if(res.affectedRows ==0){
          result({kind: "not_found"}, null);
          return;
      }
      console.log(`${res.affectedRows} 개의 게시글을 삭제하였습니다.`);
      result(null, res);
  });
};
module.exports = Post;