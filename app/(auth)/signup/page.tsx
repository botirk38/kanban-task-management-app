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


const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(100),
})
export default function Page(){

  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      },
    })

  function onSubmit(values: z.infer<typeof formSchema>){
    
    console.log(values)
  }


  return( 
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control= {form.control} name="username" render={({ field}) => (
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
      </form>
    </Form>
  )
}
