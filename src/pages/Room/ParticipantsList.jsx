export default function ParticipantsList() {
    const users = [
        {id: 1, name: 'user1'}, 
        {id: 2, name: 'user2'}, 
    ]
    return <div className="aboslute-list fixed top-1/3 min-w-24 right-8 bg-white border text-xs text-gray-500">
        <h1 className="border-b p-2">当前在线成员</h1>
        <ul className="p-2 flex flex-col gap-1">
            {users.map(user => <li key={user.id} className="cursor-pointer hover:text-black">{user.name}</li>)}
        </ul>
    </div>

}