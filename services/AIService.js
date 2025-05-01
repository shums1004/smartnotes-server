import OpenAI from "openai";
import { openAIKey } from "../config.js";


const client = new OpenAI({apiKey : openAIKey});


export async function generateSummary(content) {

    try{
        const res = await client.responses.create({
            model: "gpt-4o-mini",
            input: `Summarize this note in 1-2 Sentences to give context about what it is : ${content}`
          });
        return res.output[0].content[0].text;
    }
    catch(err){
        console.error("Error generating summary: ", err);
        throw new Error("Failed to generate summary");
    }
    
    
}

export async function generateTags(content, tags, count) {

    try{
        const res = await client.responses.create({
        model: "gpt-4o-mini",
        input: `Generate ${count} tags different than ${tags} for this note that would identify the content, just return the tags in a comma seperated format with no additional Text or numbering: ${content}`
        });
        console.log("Got response: ", res.output[0].content[0].text);
        return res.output[0].content[0].text.split(',').map(tag => tag.trim());

    } catch(err){
        throw new Error("Failed to generate tags");
    }
    
}