import { useEffect } from 'react';
import { useLoginStore, usePostStore } from '../store/store';
import { Head } from './Head'
import styles from './Write.module.css'
export function Write(props) {
  const { inLogin, addPost, editPost, postIndex } = props;
  const {hlist, setHlist, plist, setPlist} = usePostStore();
  const {setInLogin} = useLoginStore();
  const storedUser = JSON.parse(sessionStorage.getItem('user'));

  useEffect(()=>{
    if (storedUser) {
      setInLogin(true);
    }
  }, []);

  return (
    <>
      <Head/>
      <main>
        <article>
          <div className="list">
            <hr/><hr/><br/>
            <h2>글 {postIndex != null ? "수정" : "작성"}</h2><br/><hr/><hr/><br/>
            <h2>
              <label>
                <input
                  className={styles.input}
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
                  className={styles.textarea}
                  value={plist}
                  onChange={(e) => {
                    setPlist(e.target.value);
                  }}
                  placeholder='내용'
                  rows={10}
                  cols={50}
                />
              </label>
            </p>
          </div>
          <button 
          className={styles.button}
          onClick={postIndex != null ? editPost : addPost}>{postIndex != null ? "수정하기" : "발행하기"}
          </button>
        </article>
      </main>
    </>
  );
}