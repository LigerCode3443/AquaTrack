export const UserBarPopover = ({ onSettingsClick, onLogOutClick }) => {
  return (
    <div className="popover">
      <div>
        <img src="../../images/sprite.svg#settings" alt="" />
        <button onClick={onSettingsClick}>Settings</button>
      </div>
      <div>
        <img src="../../images/sprite.svg#log-out" alt="" />
        <button onClick={onLogOutClick}>Log out</button>
      </div>
    </div>
  );
};
