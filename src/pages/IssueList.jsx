import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    setIssues(data);
  };

  const handleStatusChange = async (issue, newStatus) => {
    // 🚫 Rule: Open → Done not allowed
    if (issue.status === "Open" && newStatus === "Done") {
      alert(
        "You cannot move an issue directly from Open to Done. Please move it to In Progress first."
      );
      return;
    }

    const issueRef = doc(db, "issues", issue.id);
    await updateDoc(issueRef, { status: newStatus });
    fetchIssues();
  };

  const filteredIssues = issues.filter((issue) => {
    return (
      (statusFilter === "All" || issue.status === statusFilter) &&
      (priorityFilter === "All" || issue.priority === priorityFilter)
    );
  });

  return (
    <div>
      <h2>All Issues</h2>

      <label>Status:</label>
      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option>All</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <label> Priority:</label>
      <select onChange={(e) => setPriorityFilter(e.target.value)}>
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <ul>
        {filteredIssues.map((issue) => (
          <li key={issue.id}>
            <b>{issue.title}</b> — {issue.priority}

            <br />

            <select
              value={issue.status}
              onChange={(e) =>
                handleStatusChange(issue, e.target.value)
              }
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;
