export default function AppLayout({ children }) {
    return (<div className="flex">
        <div className="w-28 h-screen bg-gray-50">
            Left sidebar
        </div>
        <div className="flex-1 grid grid-cols-7">
            <div className="col-span-5">
                {children}
            </div>
            <div className="col-span-2 h-screen bg-gray-50">
                Right side
            </div>
        </div>
    </div>)
}