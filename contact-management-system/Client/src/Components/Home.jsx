import { Plus, Trash } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";

const Home = () => {

  const fetchContacts = async () => {
    const res = await fetch('http://127.0.0.1:8000/contacts');
    if (!res.ok) throw new Error("Failed to fetch contacts");
    return res.json();
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts
  });

  return (
    <div className='flex h-screen justify-center bg-gray-400'>
      <div className='w-[50%] mb-12 bg-white flex flex-col  items-center gap-12 rounded-xl shadow-xl mt-8 py-6'>

        {/* Header */}
        <h1 className='text-2xl font-bold text-center'>Contact Management System</h1>

        {/* Buttons */}
        <div className='w-[80%] flex justify-between'>
          <button className='flex justify-center items-center w-24 h-10 gap-2 bg-green-400 cursor-pointer rounded'>
            <Plus strokeWidth={3} className='w-5 h-5 text-white' />
            <span className='text-white font-semibold'>Add</span>
          </button>

          <button className='flex justify-center items-center w-24 h-10 gap-2 bg-red-600 cursor-pointer rounded'>
            <Trash strokeWidth={3} className='w-5 h-5 text-white' />
            <span className='text-white font-semibold'>Delete</span>
          </button>
        </div>

        {/* Contact List */}
        <div className='w-[90%] h-400 mb-12 flex flex-col pt-6 px-4 bg-[#222222] text-white gap-4 rounded-xl shadow-sm'>

          {isLoading && <h1>Loading...</h1>}
          {error && <h1>Error: {error.message}</h1>}

          {/* Table Header */}
          <div className='flex justify-between  font-semibold border-b border-gray-600 pb-2'>
            <span className='w-[15%]'>First Name</span>
            <span className='w-[15%]'>Last Name</span>
            <span className='w-[10%]'>Gender</span>
            <span className='w-[10%]'>Age</span>
            <span className='w-[30%]'>Address</span>
            <span className='w-[20%]'>Contact</span>
          </div>

          {/* Table Rows */}
          {data?.contacts?.map((contact, index) => (
            <div
              key={index}
              className='flex justify-between items-center border-b border-gray-700 py-2 text-sm'
            >
              <span className='w-[15%]'>{contact.first_name}</span>
              <span className='w-[15%]'>{contact.last_name}</span>
              <span className='w-[10%]'>{contact.gender}</span>
              <span className='w-[10%]'>{contact.age}</span>
              <span className='w-[30%]'>{contact.address}</span>
              <span className='w-[20%]'>{contact.contact}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
