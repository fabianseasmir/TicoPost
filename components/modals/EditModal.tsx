import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import {toast} from "react-hot-toast";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";

const EditModal = ()=>{

    const { data: currentUser} = useCurrentUser();
    const {mutate: mutateFetchedUser} = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

   useEffect(()=>{
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);

   },[currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async()=>{
        try {
           setIsLoading(true);
            
           const response = await axios.patch('/api/edit', {
              name,
              username,
              bio,
              profileImage,
              coverImage
           });
           response.data.headers['Content-Type'];
           mutateFetchedUser();   
           toast.success('Updated'); 
           editModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        }finally{
            setIsLoading(false);
        }


    },[bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser]);


    const bodyContent = (

       <div className="flex flex-col gap-4">
          <Input placeholder="Name" onChange={(e)=> setName(e.target.value)} value={name} disabled={isLoading}>
          
          </Input>
          <Input placeholder="Username" onChange={(e)=> setUsername(e.target.value)} value={username} disabled={isLoading}>
          
          </Input>
          <Input placeholder="Bio" onChange={(e)=> setBio(e.target.value)} value={bio == null ? '' : bio} disabled={isLoading}>
          
          </Input>
       </div>



    )

   return(
    <Modal disabled={isLoading} isOpen={editModal.isOpen} title="Edit your profile" actionLabel="Save" onClose={editModal.onClose} onSubmit={onSubmit} body={bodyContent}>


    </Modal>
   );


}

export default EditModal;