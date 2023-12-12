const Layout = ({ children }) => {
    return (
        <div className='flex flex-col p-4 items-center w-full h-full'>
            { children }
        </div>
    )
}

export default Layout