import { Plus, Trash } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import AddContact from "./AddContact";
import { useState } from 'react';

const Home = () => {
   const [showAddForm, setShowAddForm] = useState(false);
   const [deleteContact,setdeleteContact]=useState(false)
  const fetchContacts = async () => {
    const res = await fetch('http://127.0.0.1:8000/contacts');
    if (!res.ok) throw new Error("Failed to fetch contacts");
    return res.json();
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts
  });

  const handleDeletecontact=(index)=>{

  }

  const contact_lenght= data?.length || 0

  return (
    <div className='relative flex h-screen justify-center bg-gray-400'>
      <div className='w-[70%] mb-12 bg-white flex flex-col  items-center gap-12 rounded-xl shadow-xl mt-8 py-6'>

        {/* Header */}
        <h1 className='text-2xl font-bold text-center'>Contact Management System</h1>

        {/* Buttons */}
        <div className='w-[80%] flex justify-between'>
          <button onClick={() => setShowAddForm(true)}  className='flex justify-center items-center w-24 h-10 gap-2 bg-green-400 hover:scale-95 transition transform duration-400 cursor-pointer rounded'>
            <Plus strokeWidth={3} className='w-5 h-5 text-white' />
            <span className='text-white font-semibold'>Add</span>
          </button>

          <button onClick={()=> setdeleteContact(prev=>!prev)} className='flex justify-center items-center w-24 h-10 gap-2 bg-red-600 hover:scale-95 transition transform duration-400 cursor-pointer rounded'>
            <Trash strokeWidth={3} className='w-5 h-5 text-white' />
            <span className='text-white font-semibold'>Delete</span>
          </button>
        </div>

        {/* Contact List */}
        <div className='w-[95%] h-400 mb-12 flex flex-col pt-6 px-4 bg-[#222222] text-white gap-4 rounded-xl shadow-sm'>

          {isLoading && <h1>Loading...</h1>}
          {error && <h1>Error: {error.message}</h1>}

          {/* Table Header */}
          <div className='flex justify-between  font-semibold border-b border-gray-600 pb-2'>
            <span className='w-[15%] text-center'>First Name</span>
            <span className='w-[15%] text-center'>Last Name</span>
            <span className='w-[10%] text-center'>Gender</span>
            <span className='w-[10%] text-center'>Age</span>
            <span className='w-[25%] text-center'>Address</span>
            <span className='w-[20%] text-center'>Contact</span>
            {deleteContact &&
            <span className='w-[5%]  text-center'>Action</span>
            }
          </div>

          {/* Table Rows */}
          {data?.contacts?.map((contact, index) => (
           <div
            key={index}
           className='flex justify-between items-center border-b border-gray-700 py-2 text-sm'>
              <span className='w-[15%] text-center'>{contact.first_name}</span>
              <span className='w-[15%] text-center'>{contact.last_name}</span>
              <span className='w-[10%] text-center'>{contact.gender}</span>
              <span className='w-[10%] text-center'>{contact.age}</span>
              <span className='w-[25%] text-center'>{contact.address}</span>
              <span className='w-[20%] text-center'>{contact.contact}</span>

              {deleteContact && (
                <span className='w-[5%] flex justify-center'>
                  <button className='flex justify-center items-center w-8 h-8 hover:scale-95 transition transform duration-400 cursor-pointer rounded'>
                    <Trash strokeWidth={3} className='w-5 h-5 text-red-600' />
                  </button>
                </span>
              )}
            </div>

          ))}
        </div>

      </div>
        <div className='absolute top-20 left-4'>
        {showAddForm && 
      <AddContact
      contact_id={contact_lenght + 1}
      onClose={() => setShowAddForm(false)} 
      />}
      </div>
    </div>
    
  );
};

export default Home;
