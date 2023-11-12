/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/PILMMsZXSbV
 */
"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const schema = z.object({
  apiKey: z.string(),
  imageUrl: z.string(),
  prompt: z.string(),
})

export function LandingComponent() {
  const [ResultResponse, setResult] = useState<string>("")
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      apiKey: '',
      imageUrl: '',
      prompt: '',
    },
  })
  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const response = await axios.post("/api/chat", values)
      console.log(response)
      setResult(response.data.content)

    } catch {
      console.log("error")
    }
  }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl lg:text-6xl/none">GPT-4 Vision</h1>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5 gap-2 space-x-1.5">
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>

                      <Label>API Key</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Image URL</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Prompt</Label>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="bg-black text-white rounded-md py-2 px-4" variant="default">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-2">
            <Label htmlFor="results">Results</Label>
            <Textarea className="h-[400px]" id="results" placeholder="Results will be displayed here" value={ResultResponse} />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="bg-black text-white rounded-full p-2">
            <svg
              className=" h-5 w-5"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  )
}
