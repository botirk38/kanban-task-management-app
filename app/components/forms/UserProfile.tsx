import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect } from "react"
import { useState } from "react"

type ProfileData = {
  bio?: string,
  birth_date?: Date | null,
  name?: string,
  user: {
    email: string, 
    id: number, 
    username: string
    password: string,
  }
}

const UserProfile = () => {

    const [userProfile, setUserProfile] = useState<ProfileData | null>(null);

     useEffect(() => {
    let isMounted = true; // Flag to track component mount status
    async function fetchProfile() {
  try {
    const response = await fetch("/api/user_profile", {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const data = await response.json();
    
    if (isMounted) {
     setUserProfile(data)  
    }
  } catch (err) {
    console.error("Error fetching profile data", err);
  }
}
 
    fetchProfile();
    return () => { isMounted = false; }; // Cleanup function
  }, []);

  useEffect( () => {
    console.log("User Profile:",userProfile);
  },[userProfile])


    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUserProfile(prevState => ({
    ...prevState,
    user: {
      ...prevState.user,
      username: e.target.value  // Updating the username inside the user object
    }
  }));


}

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUserProfile(prevState => ({
    ...prevState,
    user: {
      ...prevState.user,
      email: e.target.value // Updating the email inside the user object
    }
  }));
};
  const handlePasswordChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
    
    setUserProfile(prevState => ({
      ...prevState,
      user: {
        ...prevState.user,
        password: e.target.value
      }
    }));

  }


  const handleNameChange = ( e: React.ChangeEvent<HTMLInputElement>) => {

       setUserProfile(prevState => ({
      ...prevState,
      name: e.target.value,
      user: {
        ...prevState.user,
      }
    }));

  }

   const handleBioChange = ( e: React.ChangeEvent<HTMLInputElement>) => {

       setUserProfile(prevState => ({
      ...prevState,
      bio: e.target.value,
      user: {
        ...prevState.user,
      }
    }));

  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if(!userProfile){
      console.error("No user profile data found")
      return;
    }
    
    try {
      const response = await fetch('/api/user_profile', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userProfile}),
        

      });
      
      if (!response.ok){
        throw new Error(`Error: ${response.statusText} ${response.status}`);

      }

      const data = await response.json()
      console.log('Profile updated successfully:', data);


    }catch(err: any){
        console.error("Error updating profile:", err.message);
  }
  }





    if (!userProfile){

      return <div>Loading...</div>
    }




    return(

    <Dialog>
      <DialogTrigger asChild>
         <Avatar >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="w-full  dark:bg-blue-gray dark:text-white">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Edit profile</DialogTitle>
          <DialogDescription className="dark:text-white">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 dark:text-white">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username 
            </Label>
            <Input
              id="username" 
              className="col-span-3"
              value={userProfile?.user?.username || ''}
              onChange={handleUserNameChange}
                          
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={userProfile?.user?.email || ""}
              className="col-span-3"
              onChange={handleEmailChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="email"
              value={userProfile?.user?.password || ""}
              className="col-span-3"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full Name
            </Label>
            <Input
              id="name"
              value={userProfile?.name|| ""}
              className="col-span-3"
              onChange={handleNameChange}
            />
          </div>


         <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Input
              id="bio"
              value={userProfile?.bio|| ""}
              className="col-span-3"
              onChange={handleBioChange}
            />
          </div>

        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} className="bg-purple-dark">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    )

}

export default UserProfile
