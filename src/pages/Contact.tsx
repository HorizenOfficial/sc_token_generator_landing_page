import React, { useEffect, useState } from "react"
import TokenmintButton, { TokenmintButtonStyle } from "../components/Common/TokenmintButton"
import FormInput from "../components/Form/FormInput";

const Contact: React.FC = () => {

    const [name, setName] = useState<string | undefined>(undefined)
    const [company, setCompany] = useState<string | undefined>(undefined)
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [message, setMessage] = useState<string | undefined>(undefined)
    const [validForm, setValidForm] = useState(false)

    useEffect(() => {
        const regex = /^\S+@\S+\.\S+$/
        setValidForm(
                name !== undefined && name !== '' &&
                company !== undefined && company !== '' &&
                email !== undefined && email !== '' && regex.test(email) &&
                message !== undefined && message !== ''
        )
    }, [name, company, email, message])

    return (
            <div className="z-10">
                <main>
                    <div className={ `max-w-screen-xl ml-auto mr-auto xl:grid` }>
                        <span className={ `mx-auto text-[52px] font-bold text-white text-center mt-32` }>Contact Us</span>
                        <span className={ `mx-auto text-lg text-white text-center mt-1 px-80` }>Send us a message. We will get back to you within 24 hours!</span>

                        <div className="grid space-y-5 mt-32 mb-10 w-1/2 mx-auto">
                            <FormInput title="Your Name" value={ name } onChange={ setName }/>
                            <FormInput title="Company name" value={ company } onChange={ setCompany }/>
                            <FormInput title="Your email" value={ email } onChange={ setEmail }/>
                            <FormInput title="Message" value={ message } onChange={ setMessage } extraSize/>
                        </div>

                        <TokenmintButton
                                title={ `Send` }
                                style={ TokenmintButtonStyle.GREEN_BORDERED }
                                enabled={ validForm }
                                onClick={ () => {
                                    // TODO: Send form
                                } }
                        />
                    </div>
                </main>
            </div>
    )
}

export default Contact