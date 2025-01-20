"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button" // Corrected import path
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form" // Corrected import path
import { Input } from "@/components/ui/input" // Corrected import path
import { Textarea } from "@/components/ui/textarea" // Corrected import path

const formSchema = z.object({
  id: z.string().min(1, {
    message: "ID must be at least 1 characters long",
  }),
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  parent_id: z.string().min(1, {
    message: "Message must be at least 1 characters.",
  }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      parent_id: "",
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)

    try {
      const response = await fetch('https://venuste.onrender.com/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md ml-[35%] p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Category</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>id</FormLabel>
                <FormControl>
                  <Input type="id" placeholder="id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>parent_id</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your parent_id here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Create Category"}
          </Button>
        </form>
      </Form>
      {submitSuccess && <p className="mt-4 text-green-600 text-center">Message sent successfully!</p>}
      {submitError && <p className="mt-4 text-red-600 text-center">Error sending message. Please try again.</p>}
    </div>
  )
}
