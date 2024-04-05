
const NewAdmin=() => {

const submitHandeler=(event)=>{
    event.preventDefault();

const fd= new FormData(event.target);
const data= Object.fromEntries(fd.entries())
console.log(data)
}


    return (
      <form className="adminform" onSubmit={submitHandeler}>
        <h2>Add a new Employee</h2>

  
        <div className="control">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>
  
        <div className="control-row">
          <div className="control">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" />
          </div>
  
          <div className="control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
            />
          </div>
        </div>
  
        <hr />
  
        <div className="control-row">
          <div className="control">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name" />
          </div>
  
          <div className="control">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last-name" />
          </div>
        </div>
  
        <div className="control">
          <label htmlFor="phone">What best describes your role?</label>
          <select id="role" name="role">
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
            <option value="waiter">Waiter</option>
            <option value="other">Other</option>
          </select>
        </div>
  
        <fieldset>
          <legend>Does the new employees has an avatar?</legend>
          <div className="control">
            <input
              type="checkbox"
              id="avatar"
              name="acquisition"
              value="avatar"
            />
            <label htmlFor="yes">Yes</label>
          </div>
  
          <div className="control">
            <input
              type="checkbox"
              id="noAvatar"
              name="acquisition"
              value="noAvatar"
            />
            <label htmlFor="noAvatar">No</label>
          </div>
        </fieldset>
  
        <div className="control">
          <label htmlFor="terms-and-conditions">
            <input type="checkbox" id="terms-and-conditions" name="terms" />I
            agree that I did a background check on the new employee
            
          </label>
        </div>
        <div className="control">
          <label htmlFor="terms-and-conditions">
            <input type="checkbox" id="terms-and-conditions" name="terms" />I
            agree that the new employee has a meta mask wallet to connect
          </label>
        </div>
  
        <p className="form-actions">
          <button type="reset" className="button button-flat">
            Reset
          </button>
          <button type="submit" className="button">
            Register
          </button>
        </p>
      </form>
    );
  }
  export default NewAdmin;