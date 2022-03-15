import React, { useContext } from "react";
import useToggle from "../../hooks/useToggle";
import { ProfileContext } from "../../providers/ProfileProvider";
import styles from "./Profile.module.css";

const Profile = () => {
  const {
    currentUser: { name, icon },
    setCurrentUser,
  } = useContext(ProfileContext);
  const [showEditForm, toggleShowEditForm] = useToggle(false);

  const onSaveProfile = (e) => {
    e.preventDefault();

    console.log(e);
    setCurrentUser({
      name: e.target.username.value,
      icon: e.target.icon.value,
    });
    toggleShowEditForm();
  };

  return (
    <>
      <button onClick={toggleShowEditForm}>
        {name} {icon}
      </button>
      {showEditForm && (
        <aside className={styles.container}>
          <form onSubmit={onSaveProfile}>
            <label htmlFor="username">
              Username
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={name}
              />
            </label>
            <label htmlFor="icon">Icon</label>

            <select name="icon" id="icon" defaultValue={icon}>
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>

            <button type="button" onClick={toggleShowEditForm}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </form>
        </aside>
      )}
    </>
  );
};

export default Profile;

const ICON_OPTIONS = [
  "🐿",
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
];
