import { traduct } from '@/helpers/ChatEngine';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { PaperPlaneRight } from '@phosphor-icons/react';
import axios from 'axios';
import React, { FC, FormEvent, FormEventHandler, useEffect, useRef, useState } from 'react'


type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    item: any
}

const ChatContent: FC<Props> = ({ isOpen, onOpenChange, item }) => {


    const [formData, setFormData] = useState('');

    const refer = useRef<HTMLDivElement | null>()

    const [errorFormData, setErrorFormData] = useState(false);

    const [mns, setMns] = useState([
        {
            "from": "user",
            "message": "Empieza tu chat"
        },
    ]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (formData.trim().length === 0) {

            setErrorFormData(true)
            return
        }

        let mnsT = [...mns];
        mnsT.push(

            {
                from: "me",
                message: formData
            }
        );
        setMns(mnsT);
        setFormData('');

        const { data } = await axios.get('https://api.adviceslip.com/advice');

        const { translatedText } = await traduct(data.slip.advice);


        mnsT.push(
            {
                from: "user",
                message: translatedText.text
            }
        )

        setMns(
            [...mnsT]
        );
        scroll();

    }

    function scroll() {
        setTimeout(() => {

            refer.current?.scrollTo({
                top: refer?.current.scrollHeight,
                behavior: 'smooth',
            })
        }, 300);
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior='inside'
            placement='center'
            isDismissable={false} isKeyboardDismissDisabled={true}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Hola, {item.name}!
                        </ModalHeader>
                        <ModalBody
                            //@ts-ignore
                            ref={refer}>

                            {mns.map((m, i) => {
                                return m.from === 'me' ? <div key={i + Date.now().toString()} className='flex justify-start items-start w-full pr-10 '>
                                    <span className='w-fit bg-primary p-2 rounded-2xl text-white shadow-lg'>{m.message}</span>
                                </div>
                                    : <div key={i + Date.now().toString()} className='flex justify-end items-end w-full pl-10'>
                                        <span className=' bg-secondary p-2 w-fit rounded-2xl text-white shadow-lg'>{m.message}</span>
                                    </div>
                            })}

                        </ModalBody>
                        <ModalFooter className='flex flex-col '>
                            <form className='flex gap-2' onSubmit={(e) => handleSubmit(e)}>
                                <Input
                                    type='text'
                                    placeholder='Envia tu mensaje'
                                    value={formData}
                                    onChange={e => {
                                        setErrorFormData(false)
                                        setFormData(e.target.value)
                                    }}
                                    isInvalid={errorFormData}
                                    errorMessage={'Campo invalido'}
                                />
                                <Button type='submit' color='primary' isIconOnly><PaperPlaneRight className=' text-white text-2xl text-default-400 pointer-events-none flex-shrink-0' /></Button>
                            </form>

                            <Button color="primary" onPress={() => {
                                setMns([
                                    {
                                        "from": "user",
                                        message: "Empieza tu chat"

                                    }
                                ])
                                setFormData("");
                                onClose()
                            }}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ChatContent