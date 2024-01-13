"use client"

import * as z from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
import {useRouter} from "next/navigation";

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useEffect } from "react"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(100),
})
export default function LoginPage(){
  
  const router = useRouter();
  const {toast} = useToast();

  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      },
    })

  async function onSubmit(values: z.infer<typeof formSchema>){

    const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(values),
    credentials: 'include',
  }); 

    const data = await response.json()
    
    if (!response.ok) { 
    toast({
      title: "Login Status: ",
      description: 'Login failed check your username and password'   
      });
  } else {
    console.log("Logged in successfully")
    toast({
      title: "Login Status: ",
      description: "User logged in successfully!",
    });
      router.push('/dashboard');
  }
    
    
  }

  useEffect( () => {
    async function checkSession() {
      
      const response = await fetch('api/check-session', {
        method: 'GET',
      });

      const data = await response.json();

      if (data.isLoggedIn) {
          router.push('/dashboard');
      }

    }
    checkSession();

  }, [router] );

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
                Test Username: tester
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
                Test Password: test12345
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
          />
          <Button type="submit">Login with email.</Button>
          <Toaster/>
        </form>
      </Form>
     <Link className="absolute top-10 left-72 md:left-80 lg:left-[28rem] 2xl:left-[60rem]" href="/signup">Haven&apos;t signed up? Sign up here.</Link>

    </>
  )
}

