import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token: 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWRmOWRjNjRmZGJjM2IwMDk0NTUyNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODQzOTk5NSwiZXhwIjoxNjM4ODcxOTk1fQ.sUsnY6TZeWOr9TmnUQwNYqFBh43VAgkGvu60JmYf6NI",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <table className="widgetSmTable">
          <tbody>
          {newUsers.map((user, i) => (
            <tr className="widgetSmTr" key={i}>
              <td>
                <img
                  src={user?.profilePic || "http://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
                  alt=""
                  className="widgetSmImg"
                />
              </td>
              <td>
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user?.username}</span>
                  <span className="widgetSmUserTitle">{String(user?.isAdmin ? "Admin" : "User")}</span>
                </div>
              </td>
              <td>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
}
