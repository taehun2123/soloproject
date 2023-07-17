import { Head } from './Head'
export function Write(props) {
  const { setHlist, setPlist, addPost } = props;

  return (
    <>
      <Head />
      <main>
        <article>
          <div className="list">
            <h2>
              <label>
                <input
                  className='titlebox'
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
                  onChange={(e) => {
                    setPlist(e.target.value);
                  }}
                  placeholder='내용'
                  width={100}
                />
              </label>
            </p>
          </div>
          <button onClick={addPost}>발행하기</button>
        </article>
      </main>
    </>
  );
}