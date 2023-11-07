const Post = require("../models/post.model.js");


/* -=-=-=-=-= 게시물 CRUD =-=-=-=-=- */
exports.postCreate = (req, res) => {
  if(!req.body){
    res.status(400).send({
        message: "내용을 채워주세요!"
    });
  };

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    date : req.body.date,
    log : req.body.log
  });

  Post.create(post, (err, data) => {
    if(err){
      res.status(500).send({
          message:
          err.message || "게시글 정보를 갱신하는 중 서버 오류가 발생했습니다."
      });
    } else {
      res.send({message: '성공적으로 게시글 생성이 완료되었습니다.', success: true});
    }
  })
};

// 전체 조회 
exports.findAll = (req,res)=>{
  Post.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "게시글을 조회하는 중 오류가 발생했습니다."
        });

      else res.send(data);
    });
};


// id로 조회
exports.findOne = (req,res)=>{
  Post.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `해당 ID : ${req.params.id} 를 가진 게시글을 찾을 수 없습니다.`
          });
        } else {
          res.status(500).send({
            message: "다음 ID를 가진 게시글을 찾는 중 오류가 발생했습니다. " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  // id로 업데이트
  exports.update = (req,res)=>{
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "빈 내용은 갱신할 수 없습니다!"
      });
    } 
    else {
      Post.updateByID(req.params.postId, new Post(req.body), (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `다음 게시글을 찾을 수 없습니다. ${req.params.postId}.`
              });
            } else {
              res.status(500).send({
                message: "다음 Id를 가진 게시글을 갱신하는 데 오류가 발생했습니다. " + req.params.postId
              });
            }
          } else res.send({message: '성공적으로 게시글 수정이 완료되었습니다.', success: true});
        }
      );
    }
  };

  // id로 삭제
exports.delete = (req,res)=>{
  Post.remove(req.params.postId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `다음 게시글을 찾을 수 없습니다. ${req.params.postId}.`
          });
        } else {
          res.status(500).send({
            message: "해당 게시글을 삭제할 수 없습니다." + req.params.postId
          });
        }
      } else res.send({ message: `성공적으로 게시글을 삭제했습니다!` });
    });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
  Post.removeAll((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "전체 게시글을 삭제하는 중 오류가 발생했습니다."
        })}
      else res.send({ message: `성공적으로 모든 게시글을 삭제했습니다!` });
    })
};