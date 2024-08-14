import axios from 'axios';



export async function traduct(text: string) {
    const result = await axios.post('/api/translate', {

        "text": text,
        "target_lang": "ES"

    });

    return (result.data);
}
