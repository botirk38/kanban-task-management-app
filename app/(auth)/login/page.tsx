"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
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
import { useRouter } from "next/navigation";

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useEffect, useContext} from "react"
import { BoardsContext } from "@/app/components/context/BoardsContext"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(100),
})
export default function LoginPage() {

  const router = useRouter();
  const { toast } = useToast();
  const {fetchBoards} = useContext(BoardsContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      fetchBoards();
    }


  }

  useEffect(() => {
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

  }, [router]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-4 justify-center items-start">
                <FormLabel> Test Username: tester </FormLabel>
                <FormLabel>Username</FormLabel>
              </div>
              <FormControl>
                <Input placeholder="nightly" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-4 justify-center items-start">
                <FormLabel>Test Password: test12345</FormLabel>
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl>
                <Input placeholder="abc123456" {...field} />
              </FormControl>

              <FormDescription>
                This will be your password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button type="submit">Login with email.</Button>
          <Toaster />
        </form>
      </Form>
      <Link className="absolute top-10 left-72 md:left-80 lg:left-[28rem] 2xl:left-[60rem]" href="/signup">Haven&apos;t signed up? Sign up here.</Link>

    </>
  )
}

