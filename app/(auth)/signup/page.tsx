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
import Link from "next/link" 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(100),
  email: z.string().email(),
  name: z.string(),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})
export default function SignupPage(){

    const router = useRouter()


  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
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

        <FormField control={form.control} name="name" render={({field}) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder ="John Smith" {...field}/>
            </FormControl>

            <FormDescription>
              This will be the name your account is associated with         
              </FormDescription>
            <FormMessage/>
          </FormItem>
        )}
        />

          <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
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
        <Toaster/>
      </form>
    </Form>

       <Link className="absolute top-10 left-72 md:left-80 lg:left-[28rem] 2xl:left-[60rem]" href="/login">Already have an account? Login here</Link>

    </>
  )
}
