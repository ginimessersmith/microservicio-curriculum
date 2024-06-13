import OpenAI from "openai";

interface Options {
    prompt: string
    description: string
    parameters: string
    maxTokens?: number
}

export const check_curriculum = async (openAi: OpenAI, options: Options) => {

    const { prompt, description, parameters,maxTokens } = options

    const completion = await openAi.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `
                te seran proveidos datos de un curriculum en español, estos datos los tenes que evaluar como
                si fueras un reclutador bajo los parametros de una empresa que lanzo una convocatoria,
                tienes que leer cuidadosamente y establecer un puntaje (del 1 al 10), que tan acertado esta
                el curriculum con respecto a lo que busca la empresa, tambien redacta una opinion corta maximo un parrafo del por que el puntaje por ejemplo
                si es 9 puntos , debes decir que cumple con los requisitos establecidos o que aparte de tener los requisitos el curriculum dice
                que tiene varios años de experiencia, etc.
                La descripcion de la convocatoria de reclutamiento es: ${description}
                Los parametros de la empresa es: ${parameters}
                Calcula el porcentaje de acierto con respecto a los parametros que busca la empresa.
                al final debes de retornar en formato JSON de la siguiente forma:
                {
                    status: boolean (debes mandar true si los datos proporcionados son aptos para evaluarlos como si de un curriculum se tratase, ya que se te podria enviar cualquier string),
                    score: number (tipo de dato numero , aqui va el puntaje del 1 al 10)
                    success_percentage: number (el porcentaje de acierto, obviamente solo debes de mandarme del 0 al 100, que representa el porccentaje)
                    opinion: string (tu opinion con respecto al por que tiene ese puntaje, si lo recomiendas , etc
                }
                Nota: en caso de que lo que se te envie haya sido cualquier tipo de dato que no tenga nada que ver con respecto a un curriculum,
                retorna un json simple de la siguiente forma :
                {
                    status: boolean (debes de enviar en falso),
                   // lo demas, si son atributos de tipo entero o integer coloca 0, los string como un string vacio ''.
                }
                `,
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        model: 'gpt-4',
        temperature: 0.3,
        max_tokens: 150,

    })

    return JSON.parse(completion.choices[0].message.content)
}