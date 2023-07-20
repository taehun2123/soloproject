import { Head } from './Head'
export function Write(props) {
  const { setHlist, setPlist, addPost, editPost, hlist, plist, postIndex } = props;

  return (
    <>
      <Head />
      <main>
        <article>
          <div className="list">
            <hr/><hr/><br/>
            <h2>글 {postIndex != null ? "수정" : "작성"}</h2><br/><hr/><hr/><br/>
            <h2>
              <label>
                <input
                  className='titlebox'
                  value={hlist}
                  onChange={(e) => {
                    setHlist(e.target.value);
                  }}
                  placeholder='제목'
                  maxLength={10}
                  width={100}
                />
              </label>
            </h2>
            <p>
              <label>
                <textarea
                  className="box"
                  value={plist}
                  onChange={(e) => {
                    setPlist(e.target.value);
                  }}
                  placeholder='내용'
                  width={100}
                />
              </label>
            </p>
          </div>
          <button onClick={postIndex != null ? editPost : addPost}>{postIndex != null ? "수정하기" : "발행하기"}</button>
        </article>
      </main>
    </>
  );
}