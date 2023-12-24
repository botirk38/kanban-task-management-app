"use client"

import * as z from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { redirect } from 'next/navigation'


const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(100),
  email: z.string().email()
})
export default function SignupPage(){

    const router = useRouter()


  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      },
    })
  const {toast} = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  });

  const data = await response.json();

  if (!response.ok) {
    let errorMsg = [];
    if (data.error && data.error.email) {
      errorMsg.push(data.error.email[0]); // Assuming the error message is in an array
    }
    if (data.error && data.error.username) {
      errorMsg.push(data.error.username[0]); // Assuming the error message is in an array
    }
    toast({
      title: "Registration Status: ",
      description: errorMsg.join(" "), // Combines messages with a space
    });
  } else {
    console.log("Registered successfully")
    toast({
      title: "Registration Status: ",
      description: "User registered successfully!",
    });
    router.push('/login') 
  }
}



  return(
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control= {form.control} name="username" render={({field}) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="nightly" {...field}/>
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage/>
          </FormItem>
          )}
          />

        
        <FormField control={form.control} name="email" render={({field}) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder ="example@example.com" {...field}/>
            </FormControl>
            <FormDescription>
              This will be your primary email for your account.           
            </FormDescription>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField control={form.control} name="password" render={({field}) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder ="abc123456" {...field}/>
            </FormControl>

            <FormDescription>
              This will be your password
            </FormDescription>
            <FormMessage/>
          </FormItem>
        )}
        />


        <Button type="submit">Sign up with email.</Button>
        <Button className="absolute top-0 left-80 md:left-80 lg:left-[28rem] 2xl:left-[60rem]" variant="ghost">Already have an account? Go to login</Button>
        <Toaster/>
      </form>
    </Form>
    </>
  )
}
