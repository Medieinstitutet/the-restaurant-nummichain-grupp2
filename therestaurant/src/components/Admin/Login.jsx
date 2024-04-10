import Input from "../../UI/Input";
export default function Login() {
    
    const submitHandeler=(event)=>{
        event.preventDefault();
    
    const fd= new FormData(event.target);
    const data= Object.fromEntries(fd.entries())
    console.log(data)
    event.target.reset();
    }


    
    return (
      <form className="adminform" onSubmit={submitHandeler}>
        <h2>Login</h2>
  
        <div className="control-row">
          <div className="control no-margin">
            <Input label="email" id="email" type="email" name="email" required />
          </div>
  
          <div className="control no-margin">
            <Input label="password" id="password" type="password" name="password" required/>
          </div>
        </div>
  
        <p className="form-actions">
          <button className="button button-flat">Reset</button>
          <button className="button">Login</button>
        </p>
      </form>
    );
  }
  