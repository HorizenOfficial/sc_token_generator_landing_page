import React from "react"

const Version = () => {
    return <div className="text-white font-bold">Version: {process.env.REACT_APP_VERSION}</div>
}

export default Version
