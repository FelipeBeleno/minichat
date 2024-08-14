"use client"

import ChatContent from '@/components/ChatContent';
import { listenToCollectionChangesInstances } from '@/helpers/listeningInstances'
import { loaderOff, loaderOn } from '@/redux/slices/laoderSlice';
import { Button, Chip, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { Chat } from '@phosphor-icons/react';

import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';




const SupportPage = () => {



    const { isOpen, onOpenChange } = useDisclosure();

    const [users, setUsers] = useState<any[]>([]);

    const [chatData, setChatData] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(loaderOn());

        const unsubscribe = listenToCollectionChangesInstances((data) => {
            let rtaData = data.map(d => {

                return {
                    name: d.userName,
                    status: d.status[d.status.length - 1].state,
                    message: d.status[d.status.length - 1]?.message ? d.status[d.status.length - 1]?.message : 'No registra',
                    date: new Date(d.status[0].createdAt).toLocaleDateString(),
                    id: d.id,
                    chat: () => <Button>nuevo chat</Button>
                }
            })

            setUsers(rtaData);
        }
        );
        dispatch(loaderOff());
        return () => {
            unsubscribe()
        }
    }, [])


    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);





    return (
        <div className="col-span-12">
            <Table
                aria-label="Example table with client side pagination"

                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader>
                    <TableColumn key="name">Usuario</TableColumn>
                    <TableColumn key="status">Estado</TableColumn>
                    <TableColumn key="message">Mensaje</TableColumn>
                    <TableColumn key="date">Fecha</TableColumn>
                    <TableColumn key="chat">Chat</TableColumn>


                </TableHeader>
                <TableBody items={items}>
                    {(item) => {

                        return (
                            <TableRow key={item.id}>
                                {(columnKey) => {

                                    return columnKey === 'status' ? <TableCell>  <Chip color={
                                        item[columnKey] === 'Error'
                                            ?
                                            "danger"
                                            : item[columnKey] === 'Tomado'
                                                ?
                                                "warning"
                                                : item[columnKey] === 'Finalizado'
                                                    ? 'success'
                                                    : 'warning'


                                    }>{item[columnKey]}</Chip></TableCell> :
                                        columnKey === 'chat'
                                            ? <TableCell><Button color='primary'
                                                onClick={() => {
                                                    setChatData(item)
                                                    onOpenChange()
                                                }}
                                                endContent={<Chat />}>Chatea ahora</Button></TableCell>
                                            :
                                            <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                }
                                }
                            </TableRow>
                        )
                    }}
                </TableBody>
            </Table>

            <ChatContent isOpen={isOpen} onOpenChange={onOpenChange} item={chatData} />
        </div>
    )
}

export default SupportPage