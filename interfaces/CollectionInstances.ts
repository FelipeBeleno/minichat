interface Status {
    state: string;
    createdAt: string;
    message?: string; // Es opcional ya que no todos los estados tienen un mensaje
}

interface Message {
    from: string;
    message: string;
}

interface DataStructureInstance {
    status: Status[];
    user_id: string;
    messages: Message[];
    id?: string;
}