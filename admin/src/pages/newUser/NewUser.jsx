import "./newUser.css";
import { useContext, useState } from "react";
import storage from "../../firebase";
import { createUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";

export default function NewUser() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value});
  };

  const upload = (userItems) => {
    userItems.forEach((userItem) => {
      const fileName = new Date().getTime() + userItem.label + userItem.file.name;
      const uploadTask = storage.ref(`/userItems/${fileName}`).put(userItem.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUser((prev) => {
              return { ...prev, [userItem.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: profilePic, label: "profilePic" }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input 
            type="text" 
            placeholder="User name"
            name="username"
            onChange={handleChange} 
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input 
            type="text" 
            placeholder="Password"
            name="password"
            onChange={handleChange} 
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="john@gmail.com" 
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>IsAdmin</label>
          <select className="newUserSelect" name="isAdmin" id="isAdmin">
            <option>---</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Profile Picture</label>
          <input 
            type="file" 
            name="profilePic"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        { uploaded === 1 ? (
          <button className="newUserButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="newUserButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
