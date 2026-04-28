import { useEffect, useState } from "react";
import "./App.css";
import GameBoard from "./components/gameBoard/GameBoard";
import LevelChoice from "./components/levelChoice/LevelChoice";
import { login, logout } from "./firebase";

// Initialize Firebase

function App() {
  const [level, setLevel] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [scores, setScores] = useState([]);
  console.log("🚀 ~ App ~ scores:", scores);

  useEffect(() => {
    login(setScores);

    () => logout();
  }, []);
  const handleClick = () => {
    setLevel(null);
    setResetKey(0);
  };

  const handleReset = () => {
    setResetKey((k) => k + 1);
  };

  // async function getScores() {
  //   const auth = getAuth(app);
  //   signInAnonymously(auth)
  //     .then(() => {
  //       // Signed in..
  //       console.log("🚀 ~ getScores ~ Signed in..:", "Signed in..");
  //     })
  //     .catch((error) => {
  //       console.log("🚀 ~ getScores ~ error:", error);
  //       // ...
  //     });
  //   // const scoresCol = collection(db, "test");
  //   // const scoreSnapshot = await getDocs(scoresCol);
  //   // const scoreList = scoreSnapshot.docs.map((doc) => doc.data());
  //   // console.log("🚀 ~ getScores ~ scoreList:", scoreList);
  //   // return scoreList;
  // }

  // getScores();

  return (
    <>
      <h1>Démineur</h1>
      {level ? (
        <>
          <GameBoard key={resetKey} level={level} />
          <div>
            <button onClick={handleClick}>Changer de niveau</button>
            <button onClick={handleReset} className="reset">
              &#10227;
            </button>
          </div>
        </>
      ) : (
        <LevelChoice setLevel={setLevel} />
      )}
      {/* <button
        onClick={() =>
          postData({ name: "test", score: 10, level: "facile" }, setScores)
        }
        className="reset"
      >
        Post
      </button> */}
    </>
  );
}

export default App;
