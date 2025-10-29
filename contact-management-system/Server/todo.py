from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5173", 
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

class Contact(BaseModel):
    contact_id:int
    first_name: str
    last_name: str
    gender: str
    age: int
    address: str
    contact: str

all_contacts=[
    {
    "contact_id":0,
    "first_name":"Robera",
    "last_name":"Araraa",
    "gender":"Male",
    "age":22,
    "address":"Addis Ababa, Ethiopia",
    "contact":"+251912345678"
}
]

# GET endpoint to return all contacts

@app.get("/contacts")
def get_contacts():
    return {"contacts": all_contacts}

# POST endpoint to add a new contact

@app.post("/contacts")
def add_contact(contact: Contact):
    all_contacts.append(contact.dict())
    return {"message": "Added new contact successfully!", "data": all_contacts}

# DELETE endpoint to delete a  contact

@app.delete('/contacts/{contact_id}')

def delete_contact(contact_id:int):
    for index, contact in enumerate(all_contacts):
        if contact['contact_id']== contact_id:
            all_contacts.pop(index)
            return {"message": "Contact deleted successfully!"}
        return {"error": "Contact not found!"}, 404