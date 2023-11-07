/* -=-=-=-=-= 게시물 CRUD =-=-=-=-=- */
exports.postCreate = (req, res) => {
  if(!req.body){
    res.status(400).send({
        message: "내용을 채워주세요!"
    });
  };
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    time : req.time,
    log : req.log,
  })

  Post.create(newPost, (err, data) => {
    if(err){
      res.status(500).send({
          message:
          err.message || "게시글 정보를 갱신하는 중 서버 오류가 발생했습니다."
      });
  } else {
    res.send({message: '성공적으로 게시글 생성이 완료되었습니다.', success: true});
  }
  })
}

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
  Post.findById(req.params.postId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `해당 ID : ${req.params.userId} 를 가진 게시글을 찾을 수 없습니다.`
          });
        } else {
          res.status(500).send({
            message: "다음 ID를 가진 게시글을 찾는 중 오류가 발생했습니다. " + req.params.userId
          });
        }
      } else res.send(data);
    });

  // id로 업데이트
  exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "빈 내용은 갱신할 수 없습니다!"
    });
  }

  Post.updateById(
    req.params.postId,
    new Post(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `다음 게시글을 찾을 수 없습니다. ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "다음 Id를 가진 게시글을 갱신하는 데 오류가 발생했습니다. " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
  };

};