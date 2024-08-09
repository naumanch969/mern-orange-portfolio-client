
const Error = ({ error }) => {


    return (
        <div className="w-full h-full flex flex-col justify-center items-center " >
            <p className="text-[20px] text-red " >{error}</p>
        </div>
    )
}

export default Error;