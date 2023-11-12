import { NextResponse } from "next/server"
import OpenAI from "openai"

type OPENAIUser = {
    apiKey: string
}
async function main(key: string, prompt : string, imageURL : string){
 const openai = new OpenAI({ apiKey: key } as OPENAIUser)
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              "url": imageURL,
            },
          },
        ],
      },
    ],
  });
    return response.choices[0]
}

export async function POST(
    req: Request
) {
    
    const {apiKey, imageUrl, prompt} = await req.json()
    const values = await main(apiKey, prompt, imageUrl)
    try {
       return NextResponse.json({content : values.message.content})
    } catch (error) {
        console.log("[CHAT ERROR]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}