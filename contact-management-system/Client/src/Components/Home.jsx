import { Plus,Trash } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";

const Home = () => {

/* const fetchcontact=async()=>{
      const res = await fetch('http://127.0.0.1:8000/contact')
      return res.json()
    }

    const{data:contactData ,isLoading ,error ,refetch}=useQuery({
        queryKey:['contact'],
        queryFn:fetchcontact
    })
        */
  return (
    <div className='flex h-screen justify-center bg-gray-400'>
        <div className='w-[50%] h-200 bg-white flex flex-col justify-center items-center gap-12  rounded-xl shadow-xl mt-8'>
            <div>
                 <h1 className='text-2xl font-bold text-center'>Contact Management System</h1>
            </div>
            <div className='w-[80%]  flex justify-between'>
              <div>
                <button className='flex justify-center items-center w-24 h-10 gap-2 bg-green-400 cursor-pointer rounded'>
                   <Plus strokeWidth={3} className='w-5 h-5 text-white'/>
                <span className='text-white font-semibold'>Add</span>
                </button>
                
             </div>

                 <div>
                <button className='flex justify-center items-center w-24 h-10  gap-2 bg-red-600 cursor-pointer rounded'>
                   <Trash strokeWidth={3} className='w-5 h-5 text-white'/>
                <span className='text-white font-semibold'>Delete</span>
                </button>
                
             </div>
            </div>

            {/*todo list */}

             <div className='w-[90%] h-100 mb-12 flex flex-col pt-6 pl-4 bg-[#222222] text-white  gap-12  rounded-xl shadow-sm'>
   
             </div>


         
        </div>
       
      
        
    </div>
  )
}

export default Home