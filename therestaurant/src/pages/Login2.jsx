import Input from "../components/Input";
export default function Login() {
   
    const submitHandeler=(event)=>{
        event.preventDefault();
   
    const fd= new FormData(event.target);
    const data= Object.fromEntries(fd.entries())
    console.log(data)
    event.target.reset();
    }
 
 
   
    return (
        <>
        </>
    );
  }