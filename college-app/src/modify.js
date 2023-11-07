import { useState  } from "react";
import AdminNavbar from "./adminnav";
// import { MyContext } from './context';

const Modify = () => {
    
    const [id, setID] = useState(1);
    const [st, setst] = useState();
    const [st2, setst2] = useState(null);
    const [st3, setst3] = useState(null);
    const [Data, setdata] = useState();
    const [savest, setsavest] = useState();

   
    const [disabled, setdis] = useState(true);
    
    const [edit, setedit] = useState(false);
    
    const change=()=>
    {
        setdis(false);
        setedit(true);
    }
    const remove=()=>
    {
      fetch('http://localhost:8000/api/remove', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id:id})
      }).then(() => {
        setst(null);
        setst3(1);
      }) 
    }
    const save=()=>
    {
      
    fetch('http://localhost:8000/api/change', {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data)
      }).then(() => {
        setst(null);
        setsavest(true);
        
        setTimeout(() => {
            setsavest(false);
        }, 1000);
        
      })
      .catch(err=>
      {
        console.log(err);
        
      })
    }
    
    const search = (e) => {
        e.preventDefault();
        setst3(null);
        setedit(null);
        setdis(true);
        const abortCont = new AbortController();
        fetch("http://localhost:8000/api/"+id, { signal: abortCont.signal
    })
          .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            } 
            return res.json();
          })
          .then(data => {
            if (data.length===1)
            {setdata(data[0]);
              if(!Data.batch){setdata({...Data,batch:'null'});}
            setst(1);
            setst2(null)}
            else {setst2(1);setst(null);}
            
          })
          .catch(err => {
            if (err.name === 'AbortError') {
              console.log('fetch aborted')
            } else
            {console.log(err);}
          })
        }
    return ( 
        
        <div>
            <AdminNavbar/>
            <p>
                modify
            </p>
            <form onSubmit={search}>
            <label>id:</label>
            <input 
            type="text" 
            required 
            value={id}
            onChange={(e) => setID(e.target.value)}
            />
            <button>search</button>
            
            </form>
            {st&&
                        <div>
                        <p>id</p>
                        <input type ='text'
                        value={Data.id}
                        disabled={true}
                        onChange={(e)=>setdata({...Data,id:e.target.value})}
                        />
                        <p>name</p>
                        <input type ='text'
                        value={Data.name}
                        disabled={disabled}
                        onChange={(e)=>setdata({...Data,name:e.target.value})}//change only name
                        />
                        <p>batch</p><input type='text'
              value={Data.batch}
              disabled={disabled}
              onChange={(e) => setdata({...Data,batch:e.target.value})} />
                        <br/><br/>
                        
                        {!edit&&<button onClick={change}>edit</button>}
                        {!edit&&<button onClick={remove}>remove</button>}
                        {edit&&<button onClick={save}>save</button>}
                    </div>
            }
            {
              st2&&<p>No matches</p>
            }
            {st3&&<p>Removed Successfully</p>}
            {savest&&
                <p>saved previous entry</p>
            }
            

        </div>
     );
}
 
export default Modify;