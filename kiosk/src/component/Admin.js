export function Admin(props){
  return(
    <div className='adminpage'>
      <h2>관리자 페이지</h2>      
        <button onClick={()=>{props.setAdmin(1)}} className='button'>관리자 모드 전환</button>
        <button onClick={()=>{props.setAdmin(0)}} className='button'>유저 모드 전환</button>
        <p>관리자 모드 전환 시 수정버튼과 삭제버튼이 생깁니다.</p>
        <br/>
      <hr/><br/>
        <h3>상품 {props.admin==2 ? "수정" : "추가"}</h3><br/>
        <label>상품 이름 : <input value={props.addName} onChange={(e)=>{props.setAddName(e.target.value)}}/></label><br/><br/>
        <label>상품 설명 : <input value={props.addContent} onChange={(e)=>{props.setAddContent(e.target.value)}}/></label><br/><br/>
        <label>상품 가격 : <input value={props.addPrice} onChange={(e)=>{props.setAddPrice(e.target.value)}}/></label><br/><br/>
        <button onClick={props.admin==2 ? ()=>props.editList() : ()=>props.addList()}>{props.admin == 2 ? "수정하기" : "추가하기"}</button>
    </div>
  )
}