import { X } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddContact = ({onClose,contact_id}) => {
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");


  const addContact=async (new_contact) => {
    const res = await fetch(`http://127.0.0.1:8000/contacts`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_contact),
      });

      if (!res.ok) throw new Error ("Failed to add new contact")
      return res.json()

  }

  const mutation=useMutation({
    mutationFn:addContact,
    onSuccess:()=>{
      queryClient.invalidateQueries(['contacts'])
    }
    
  })

   const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = {
      contact_id:contact_id,
      first_name: firstName,
      last_name: lastName,
      contact:contact,
      age:age,
      gender:gender,
      address:address
    };
      mutation.mutate(contactData); 
  }


return (
    <div className=" inset-0 bg-transparent bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[400px] rounded-xl shadow-xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Add New Contact</h2>

        {/* Form */}
        <form className="flex flex-col gap-3">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className=" p-2 rounded  bg-gray-200 outline-none "
             onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className=" p-2 rounded bg-gray-200 outline-none"
             onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="text"
            name="gender"
            placeholder="Gender"
            className=" p-2 rounded bg-gray-200 outline-none"
             onChange={(e) => setGender(e.target.value)}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            className=" p-2 rounded bg-gray-200 outline-none"
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className=" p-2 rounded bg-gray-200 outline-none"
           onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            name="contact"
            placeholder="Phone Number"
            className=" p-2 rounded bg-gray-200 outline-none"
           onChange={(e) => setContact(e.target.value)}
          />

          <button
          onClick={handleSubmit}
            type="submit"
            className="bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 mt-2"
          >
            Save Contact
          </button>
         {mutation.isError && <p className="text-red-500">Error: {mutation.error.message}</p>}
         {mutation.isSuccess && <p className="text-green-500">Contact added!</p>}
        </form>
      </div>
    </div>
  );
};
export default AddContact