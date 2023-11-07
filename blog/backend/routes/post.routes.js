module.exports = (app) =>{

  const posts = require("../controllers/post.controller.js");
  
  /* -=-=-=-=-= 방명록 CRUD =-=-=-=-=- */
  
  //POST 전체 조회
  app.get("/post", posts.findAll);

  // Post id로 조회
  app.get("/post/:postId", posts.findOne);

  // Post id로 수정
  app.put("/post/:postId", posts.update);

  // POST 생성
  app.post("/post", posts.postCreate);
}