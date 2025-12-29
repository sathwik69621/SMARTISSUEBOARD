import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [assignedTo, setAssignedTo] = useState("");
  const [existingTitles, setExistingTitles] = useState([]);
  const navigate = useNavigate();

  // Fetch existing issue titles
  useEffect(() => {
    const fetchIssues = async () => {
      const snapshot = await getDocs(collection(db, "issues"));
      const titles = snapshot.docs.map((doc) => doc.data().title.toLowerCase());
      setExistingTitles(titles);
    };
    fetchIssues();
  }, []);

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔍 Similar issue detection (ADD HERE)
  const newWords = title
    .toLowerCase()
    .split(" ")
    .filter((w) => w.length > 3);

  const isSimilar = existingTitles.some((existingTitle) => {
    let matchCount = 0;

    newWords.forEach((word) => {
      if (existingTitle.includes(word)) {
        matchCount++;
      }
    });

    return matchCount >= 2;
  });

  if (isSimilar) {
    const confirmCreate = window.confirm(
      "Similar issue already exists. Do you want to create it anyway?"
    );
    if (!confirmCreate) return;
  }

  // ✅ Create issue only after confirmation
  await addDoc(collection(db, "issues"), {
    title,
    description,
    priority,
    status: "Open",
    assignedTo,
    createdBy: auth.currentUser.email,
    createdAt: serverTimestamp(),
  });

  navigate("/dashboard");
};


  return (
    <div>
      <h2>Create Issue</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <br /><br />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <br /><br />

        <input
          placeholder="Assigned To (email)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
}

export default CreateIssue;
