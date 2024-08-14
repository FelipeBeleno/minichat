import * as DeepL from 'deepl-node';
import { NextRequest } from 'next/server';


interface ResponseType {

    text: string,
    detectedSourceLang: string

}

const authKey = "0071e53d-c34c-4038-a408-e295188fe4fa:fx";
const translator = new DeepL.Translator(authKey);


export async function POST(req: NextRequest) {

    const body = await req.json();


    try {
        const result = await translator.translateText(body.text, null, 'es');


        return Response.json({ translatedText: result });
    } catch (error) {
        console.log(error)
    }

}


export async function GET() {
    return Response.json(true);
}