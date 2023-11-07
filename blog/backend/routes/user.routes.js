module.exports = (app) =>{

  const users = require("../controllers/user.controller.js");

  // 튜플(회원 정보) 생성
  app.post("/users", users.create);

  // 전체 조회 
  app.get("/users", users.findAll);

  // id로 조회
  app.get("/users/:customerId", users.findOne);

  // id로 수정
  app.put("/users/:customerId", users.update);

  // id로 삭제
  app.delete("/users/:customerId", users.delete);

  // 전체 삭제
  app.delete("/users", users.deleteAll);

  /* -=-=-=-=-= 회원가입 / 로그인 관련 =-=-=-=-=- */

  // userId 중복 체크
  app.get("/signUp/:userId", users.checkId);

  // 로그인 유효성 검사
  app.post("/login", users.login);

  // 로그아웃 처리 검사
  app.get("/logout", users.logout)

};